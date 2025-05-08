import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { TouchableOpacity } from 'react-native';

// Configuración de conexión PostgreSQL
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "Arturo_Ruedas",
  user: "postgres",
  password: "arturoruedas",
});

// Verifica conexión
pool.connect()
  .then(() => {
    console.log("Conexión exitosa a PostgreSQL ✅");
  })
  .catch((error) => {
    console.error("❌ Error al conectar a PostgreSQL:", error);
  });

// Inicializa Express
const app = express();
const PORT = process.env.PORT || 3001; 

// Middleware
app.use(cors());
app.use(express.json());

// Ruta para registrar usuario
app.post('/registrar', async (req: Request, res: Response) => {
  const { nombre, correo, contraseña, telefono } = req.body;

  try {
    await pool.query(
      'INSERT INTO usuario (nombre, correo, contraseña, telefono) VALUES ($1, $2, $3, $4)',
      [nombre, correo, contraseña, telefono]
    );
    res.status(200).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

//ruta para iniciar sesion
app.post('/iniciar-sesion', async (req: Request, res: Response) => {
  const { correo, contraseña } = req.body;

  try {
    const resultado = await pool.query(
      'SELECT * FROM usuario WHERE correo = $1 AND contraseña = $2',
      [correo, contraseña]
    );

    if (resultado.rows.length > 0) {
      res.status(200).json({
        mensaje: 'Inicio de sesión exitoso',
        usuario: resultado.rows[0] // debe contener ID_usuario
      });
    } else {
      res.status(401).json({ mensaje: 'Correo o contraseña incorrectos' });
    }
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

  app.get('/buscar', async (req: Request, res: Response) => {
    const nombre = req.query.nombre as string;
  
    if (!nombre || nombre.trim() === '') {
      return res.status(400).json({ error: 'El parámetro nombre es obligatorio' });
    }
  
    try {
      const resultado = await pool.query(
        'SELECT ID_publicacion, nombre_Articulo, descripcion, precio, foto FROM com_ventas WHERE nombre_Articulo ILIKE $1',
        [`%${nombre}%`]
      );
  
      if (resultado.rows.length === 0) {
        console.log('No se encontraron artículos con ese nombre.');
      }
  
      const articulos = resultado.rows.map((row) => ({
        id: row.id || row.ID_publicacion, 
        nombre_Articulo: row.nombre_Articulo,
        descripcion: row.descripcion,
        precio: row.precio,
        foto: row.foto,
      }));
  
      res.status(200).json(articulos);
    } catch (error) {
      console.error('Error al buscar artículos:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

//CARRITO DE COMPRAS
app.get('/carrito/:id_usuario', async (req: Request, res: Response) => {
  const ID_usuario = parseInt(req.params.ID_usuario);

  if (isNaN(ID_usuario)) {
    return res.status(400).json({ error: 'ID de usuario no válido' });
  }

  try {
    const resultado = await pool.query(
      `SELECT c.ID_carrito, cv.ID_publicacion, cv.nombre_Articulo, cv.descripcion, cv.precio, cv.foto
       FROM carrito c
       JOIN com_ventas cv ON c.ID_publicacion = cv.ID_publicacion
       WHERE c.ID_usuario = $1`,
      [ID_usuario]
    );

    const articulos = resultado.rows.map((row) => ({
      id: row.ID_publicacion,
      nombre_Articulo: row.nombre_Articulo,
      descripcion: row.descripcion,
      precio: row.precio,
      foto: row.foto,
    }));

    res.status(200).json(articulos);
  } catch (error) {
    console.error('Error al obtener el carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
app.post('/agregar-carrito', async (req: Request, res: Response) => {
  const { ID_usuario, ID_publicacion } = req.body;

  if (!ID_usuario || !ID_publicacion) {
    return res.status(400).json({ error: 'Faltan datos necesarios' });
  }

  try {
    // Opcional: Verificar que el artículo no esté duplicado en el carrito
    const existe = await pool.query(
      'SELECT * FROM carrito WHERE ID_usuario = $1 AND ID_publicacion = $2',
      [ID_usuario, ID_publicacion]
    );

    if (existe.rows.length > 0) {
      return res.status(409).json({ mensaje: 'El artículo ya está en el carrito' });
    }

    await pool.query(
      'INSERT INTO carrito (ID_usuario, ID_publicacion) VALUES ($1, $2)',
      [ID_usuario, ID_publicacion]
    );

    res.status(200).json({ mensaje: 'Artículo agregado al carrito correctamente' });
  } catch (error) {
    console.error('Error al agregar artículo al carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
//eliminar carrito
app.delete('/eliminar-carrito', async (req: Request, res: Response) => {
  const { ID_usuario, ID_publicacion } = req.body;

  if (!ID_usuario || !ID_publicacion) {
    return res.status(400).json({ error: 'Faltan datos necesarios' });
  }

  try {
    await pool.query(
      'DELETE FROM carrito WHERE ID_usuario = $1 AND ID_publicacion = $2',
      [ID_usuario, ID_publicacion]
    );
    res.status(200).json({ mensaje: 'Artículo eliminado del carrito correctamente' });
  } catch (error) {
    console.error('Error al eliminar artículo del carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Iniciar servido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
