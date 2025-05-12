import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';

// Configuración mejorada de conexión PostgreSQL
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "Arturo_Ruedas",
  user: "postgres",
  password: "arturoruedas",
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Verificación mejorada de conexión
pool.connect()
  .then(() => {
    console.log("✅ Conexión exitosa a PostgreSQL");
    return pool.query('SELECT NOW()');
  })
  .then((res) => {
    console.log(`🕒 Hora del servidor PostgreSQL: ${res.rows[0].now}`);
  })
  .catch((error) => {
    console.error("❌ Error al conectar a PostgreSQL:", error.message);
    process.exit(1);
  });

const app = express();
const PORT = process.env.PORT || 3001; 

// Configuración mejorada de CORS y middleware
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware para manejo de errores global
app.use((err: Error, req: Request, res: Response, next: Function) => {
  console.error('⚠️ Error global:', err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Validación de campos comunes
const validarCamposUsuario = (req: Request, res: Response, next: Function) => {
  const { nombre, correo, contraseña, telefono } = req.body;
  
  if (!nombre || !correo || !contraseña || !telefono) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }
  
  if (telefono.length !== 10 || !/^\d+$/.test(telefono)) {
    return res.status(400).json({ error: 'Teléfono debe tener 10 dígitos' });
  }
  
  next();
};

// Ruta para registrar usuario - Mejorada
app.post('/registrar', validarCamposUsuario, async (req: Request, res: Response) => {
  try {
    const { nombre, correo, contraseña, telefono } = req.body;
    
    const usuarioExistente = await pool.query(
      'SELECT 1 FROM usuario WHERE correo = $1',
      [correo]
    );
    
    if (usuarioExistente.rows.length > 0) {
      return res.status(409).json({ error: 'El correo ya está registrado' });
    }

    const result = await pool.query(
      'INSERT INTO usuario (nombre, correo, contraseña, telefono) VALUES ($1, $2, $3, $4) RETURNING id_usuario, nombre, correo',
      [nombre, correo, contraseña, telefono]
    );
    
    res.status(201).json({ 
      mensaje: 'Usuario registrado correctamente',
      usuario: result.rows[0]
    });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para iniciar sesión - Mejorada
app.post('/iniciar-sesion', async (req: Request, res: Response) => {
  try {
    const { correo, contraseña } = req.body;
    
    if (!correo || !contraseña) {
      return res.status(400).json({ error: 'Correo y contraseña son obligatorios' });
    }

    const result = await pool.query(
      `SELECT id_usuario, nombre, correo 
       FROM usuario 
       WHERE correo = $1 AND contraseña = $2`,
      [correo, contraseña]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales incorrectas' });
    }

    res.status(200).json({ 
      mensaje: 'Inicio de sesión exitoso',
      usuario: result.rows[0]
    });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


//Publicar articulo
app.post('/publicar_articulo', async (req: Request, res: Response) =>{
  const {nombre_Articulo, descripcion, precio, foto} = req.body;

  try{
    await pool.query(
      'INSERT INTO com_ventas (nombre_Articulo, descripcion, precio, foto) VALUES ($1, $2, $3, $4)',
      [nombre_Articulo, descripcion, precio, foto]
    );
    res.status(200).json({mensaje: 'Articulo agregado correctamente'});
  } catch(error){
    console.error('Error al publicar el articulo', error);
    res.status(500).json({error: 'Error en el servidor'})
  }
  })
// Ruta para buscar artículos - Mejorada
app.get('/buscar', async (req: Request, res: Response) => {
  try {
    const { nombre, min_precio, max_precio } = req.query;
    
    if (!nombre || typeof nombre !== 'string') {
      return res.status(400).json({ error: 'Parámetro nombre es obligatorio' });
    }

    let query = `
      SELECT id_publicacion, nombre_articulo, descripcion, precio, foto 
      FROM com_ventas 
      WHERE nombre_articulo ILIKE $1
    `;
    const params = [`%${nombre}%`];
    
    if (min_precio) {
      query += ' AND precio >= $2';
      params.push(min_precio as string);
    }
    
    if (max_precio) {
      query += ` AND precio <= $${params.length + 1}`;
      params.push(max_precio as string);
    }

    const resultado = await pool.query(query, params);
    
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('Error al buscar artículos:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Ruta para agregar al carrito - Mejorada
app.post('/agregar-carrito', async (req: Request, res: Response) => {
  try {
    const { id_usuario, id_publicacion } = req.body;
    
    if (!id_usuario || !id_publicacion) {
      return res.status(400).json({ error: 'IDs de usuario y publicación son obligatorios' });
    }

    // Verificar existencia en una sola consulta
    const verificacion = await pool.query(
      `SELECT 
        (SELECT 1 FROM usuario WHERE id_usuario = $1) AS usuario_existe,
        (SELECT 1 FROM com_ventas WHERE id_publicacion = $2) AS articulo_existe,
        (SELECT 1 FROM carrito WHERE id_usuario = $1 AND id_publicacion = $2) AS en_carrito`,
      [id_usuario, id_publicacion]
    );
    
    const { usuario_existe, articulo_existe, en_carrito } = verificacion.rows[0];
    
    if (!usuario_existe) return res.status(404).json({ error: 'Usuario no encontrado' });
    if (!articulo_existe) return res.status(404).json({ error: 'Artículo no encontrado' });
    if (en_carrito) return res.status(409).json({ error: 'Artículo ya está en el carrito' });

    await pool.query(
      'INSERT INTO carrito (id_usuario, id_publicacion) VALUES ($1, $2)',
      [id_usuario, id_publicacion]
    );

    res.status(201).json({ mensaje: 'Artículo agregado al carrito correctamente' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Eliminar del carrito - Mejorada
app.delete('/eliminar-carrito', async (req: Request, res: Response) => {
  try {
    const { id_usuario, id_publicacion } = req.body;
    
    if (!id_usuario || !id_publicacion) {
      return res.status(400).json({ error: 'IDs de usuario y publicación son obligatorios' });
    }

    const result = await pool.query(
      `DELETE FROM carrito 
       WHERE id_usuario = $1 AND id_publicacion = $2 
       RETURNING 1`,
      [id_usuario, id_publicacion]
    );
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Artículo no encontrado en el carrito' });
    }

    res.status(200).json({ mensaje: 'Artículo eliminado del carrito correctamente' });
  } catch (error) {
    console.error('Error al eliminar del carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Iniciar servidor con manejo de errores
app.listen(PORT, () => {
  console.log(`🚀 Servidor escuchando en el puerto ${PORT}`);
}).on('error', (err) => {
  console.error('❌ Error al iniciar el servidor:', err.message);
  process.exit(1);
});

// Manejo de cierre limpio
process.on('SIGTERM', () => {
  console.log('🛑 Recibida señal SIGTERM. Cerrando servidor...');
  pool.end().then(() => {
    console.log('✅ Conexión a PostgreSQL cerrada');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('🛑 Recibida señal SIGINT. Cerrando servidor...');
  pool.end().then(() => {
    console.log('✅ Conexión a PostgreSQL cerrada');
    process.exit(0);
  });
});