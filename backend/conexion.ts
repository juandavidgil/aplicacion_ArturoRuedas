import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import nodemailer from 'nodemailer';
import axios from "axios";
import dotenv from "dotenv";
import { Expo } from "expo-server-sdk";
const expo = new Expo();


dotenv.config();
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
      `SELECT id_usuario AS "ID_usuario", nombre, correo 
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



// 📧 Envío de código de recuperación
const codigosReset = new Map<string, string>();
app.post('/enviar-correo-resetc', async (req, res) => {
  const { correo } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuario WHERE correo = $1', [correo]);
    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'Correo no registrado' });
    }
    
    const codigo = Math.floor(100000 + Math.random() * 900000).toString();
    codigosReset.set(correo, codigo);
    console.log(`📩 Código generado para ${correo}: ${codigo}`);
    
    // 🛠️ Configura tu contraseña de aplicación aquí
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'juandavidgil0911@gmail.com',
        pass: '123456',
      },
    });
    
    await transporter.sendMail({
      from: '"Soporte Ruedas" <tucorreo@gmail.com>',
      to: correo,
      subject: 'Código para restablecer contraseña',
      text: `Tu código es: ${codigo}`,
    });
    
    res.json({ mensaje: 'Código enviado al correo' });
  } catch (error) {
    console.error('❌ Error enviando correo:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

// 🔄 Restablecer contraseña
app.post('/restablecer-contrasena', async (req, res) => {
  const { correo, codigo, nuevaContraseña } = req.body;
  const codigoGuardado = codigosReset.get(correo);
  if (!codigoGuardado || codigoGuardado !== codigo) {
    return res.status(400).json({ mensaje: 'Código incorrecto o expirado' });
  }
  
  try {
    await pool.query('UPDATE usuario SET contraseña = $1 WHERE correo = $2', [nuevaContraseña, correo]);
    codigosReset.delete(correo);
    res.json({ mensaje: 'Contraseña actualizada correctamente' });
  } catch (error) {
    console.error('❌ Error actualizando contraseña:', error);
    res.status(500).json({ mensaje: 'Error del servidor' });
  }
});

//buscar 
app.get('/buscar', async (req: Request, res: Response) => {
  const nombre = req.query.nombre as string;
  
  if (!nombre || nombre.trim() === '') {
    return res.status(400).json({ error: 'El parámetro "nombre" es obligatorio' });
  }
  
  try {
    const resultado = await pool.query(
      `SELECT 
      cv.ID_publicacion as id,
      cv.nombre_Articulo, 
      cv.descripcion, 
      cv.precio, 
      cv.tipo_bicicleta, 
      cv.foto, 
      cv.ID_usuario,
      u.nombre as nombre_vendedor,
      u.telefono
      FROM com_ventas cv 
      INNER JOIN usuario u ON cv.ID_usuario = u.ID_usuario 
      WHERE cv.nombre_Articulo ILIKE $1`,
      [`%${nombre}%`]
    );
    
    res.status(200).json(resultado.rows);
  } catch (error) {
    console.error('❌ Error al buscar artículos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});


//Publicar articulo
app.post('/publicar_articulo', async (req: Request, res: Response) => {
  const { nombre_Articulo, descripcion, precio, tipo_bicicleta,tipo_componente , foto, ID_usuario } = req.body;
  
  if (!ID_usuario) {
    return res.status(400).json({ error: 'ID de usuario es requerido' });
  }
  
  try {
    const result = await pool.query(
      `INSERT INTO com_ventas 
      (nombre_Articulo, descripcion, precio, tipo_bicicleta,tipo_componente , foto, ID_usuario) 
      VALUES ($1, $2, $3, $4, $5, $6 ,$7) 
      RETURNING ID_publicacion`,
      [nombre_Articulo, descripcion, precio, tipo_bicicleta, tipo_componente , foto, ID_usuario]
    );
    
    res.status(201).json({ 
      mensaje: 'Artículo publicado con éxito',
      ID_publicacion: result.rows[0].ID_publicacion
    });
  } catch (error) {
    console.error('Error al publicar artículo:', error);
    res.status(500).json({ error: 'Error al publicar el artículo' });
  }
});
// Guardar token de notificaciones de un usuario 

app.post("/test-notification", async (req: Request, res: Response) => {
  try {
    const { ID_usuario, token } = req.body;

    if (!token) {
      return res.status(400).json({ error: "Token requerido" });
    }

    // Enviar notificación
    if (Expo.isExpoPushToken(token)) {
      await expo.sendPushNotificationsAsync([
        {
          to: token,
          sound: "default",
          title: "📢 Notificación de prueba",
          body: "Si ves esto, las notificaciones funcionan 🚀",
        },
      ]);
    }

    res.json({ mensaje: "Notificación enviada con éxito" });
  } catch (error) {
    console.error("❌ Error en /test-notification:", error);
    res.status(500).json({ error: "Error enviando notificación" });
  }
});



const router = express.Router();

// ✅ Guardar token de notificación para un usuario
router.post("/guardar-token", async (req: Request, res: Response) => {
  try {
    const { ID_usuario, token } = req.body;

    if (!ID_usuario || !token) {
      return res.status(400).json({ error: "ID_usuario y token son obligatorios" });
    }

    // Verificamos si ya existe token para este usuario
    const existe = await pool.query(
      "SELECT * FROM user_tokens WHERE user_id = $1 AND token = $2",
      [ID_usuario, token]
    );

    if (existe.rows.length === 0) {
      await pool.query(
        "INSERT INTO user_tokens (user_id, token) VALUES ($1, $2)",
        [ID_usuario, token]
      );
    }

    res.json({ mensaje: "Token guardado correctamente ✅" });
  } catch (error) {
    console.error("Error al guardar token:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Enviar notificación de prueba
router.post("/test-notification", async (req: Request, res: Response) => {
  try {
    const { ID_usuario } = req.body;

    if (!ID_usuario) {
      return res.status(400).json({ error: "ID_usuario es obligatorio" });
    }

    // Buscar todos los tokens del usuario
    const tokens = await pool.query(
      "SELECT token FROM user_tokens WHERE user_id = $1",
      [ID_usuario]
    );

    if (tokens.rows.length === 0) {
      return res.status(404).json({ error: "El usuario no tiene tokens registrados" });
    }

    const mensajes = tokens.rows.map((t: any) => ({
      to: t.token,
      sound: "default",
      title: "🚀 Notificación de prueba",
      body: "Hola, esta es una notificación de prueba.",
    }));

    // Enviar notificaciones con Expo
    const chunks = expo.chunkPushNotifications(mensajes);
    for (const chunk of chunks) {
      await expo.sendPushNotificationsAsync(chunk);
    }

    res.json({ mensaje: "Notificaciones enviadas correctamente ✅" });
  } catch (error) {
    console.error("Error al enviar notificación:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});





// Ruta para agregar al carrito - Mejorada
app.post('/agregar-carrito', async (req: Request, res: Response) => {
  try {
    const { ID_usuario, ID_publicacion } = req.body;
    console.log('ID_usuario recibido:', ID_usuario);
    console.log('ID_publicacion recibido:', ID_publicacion);
    
    if (!ID_usuario || !ID_publicacion) {
      return res.status(400).json({ error: 'IDs de usuario y publicación son obligatorios' });
      
    }
    
    // Verificar existencia del usuario por correo
    const verificacion = await pool.query(
      `SELECT 
      (SELECT 1 FROM usuario WHERE ID_usuario = $1) AS usuario_existe,
      (SELECT 1 FROM com_ventas WHERE ID_publicacion = $2) AS articulo_existe,
      (SELECT 1 FROM carrito WHERE ID_usuario = $1 AND ID_publicacion = $2) AS en_carrito`,
      [ID_usuario, ID_publicacion]
    );
    
    console.log('Resultado de verificación:', verificacion.rows[0]);
    
    const { usuario_existe, articulo_existe, en_carrito } = verificacion.rows[0];
    
    if (!usuario_existe) return res.status(404).json({ error: 'Usuario no encontrado' });
    if (!articulo_existe) return res.status(404).json({ error: 'Artículo no encontrado' });
    if (en_carrito) return res.status(409).json({ error: 'Artículo ya está en el                                                                                               carrito' });
    
    await pool.query(
      'INSERT INTO carrito (ID_usuario, ID_publicacion) VALUES ($1, $2)',
      [ID_usuario, ID_publicacion]
    );
    //NOTIFICACION
     const datosVendedor = await pool.query(
      `SELECT u.id_usuario, u.nombre
       FROM com_ventas cv
       JOIN usuario u ON cv.id_usuario = u.id_usuario
       WHERE cv.id_publicacion = $1`,
      [ID_publicacion]
    );

    const vendedor = datosVendedor.rows[0];
    if (vendedor) {
      const tokens = await pool.query(
        "SELECT token FROM user_tokens WHERE user_id = $1",
        [vendedor.id_usuario]
      );

      if (tokens.rows.length > 0) {
        const mensajes = tokens.rows.map((t: any) => ({
          to: t.token,
          sound: "default",
          title: "¡Nuevo interés en tu artículo!",
          body: "Un usuario agregó tu artículo al carrito 🚀",
        }));

        const chunks = expo.chunkPushNotifications(mensajes);
        for (const chunk of chunks) {
          await expo.sendPushNotificationsAsync(chunk);
        }

        console.log("📩 Notificación enviada al vendedor:", vendedor.nombre);
      }
    }

    res.status(201).json({ mensaje: 'Artículo agregado al carrito correctamente' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});



// Endpoint para obtener los artículos del carrito de un usuario
app.get('/carrito/:id_usuario', async (req: Request, res: Response) => {
  try {
    const { id_usuario } = req.params;
    
    if (!id_usuario || isNaN(Number(id_usuario))) {
      return res.status(400).json({ error: 'ID de usuario inválido' });
    }
    
    const result = await pool.query(
      `SELECT 
      cv.ID_publicacion as id,
      cv.nombre_Articulo,
      cv.descripcion,
      cv.precio,
      cv.tipo_bicicleta,
      u.nombre as nombre_vendedor,
      u.telefono,
      cv.ID_usuario as id_vendedor
      FROM carrito c
      JOIN com_ventas cv ON c.ID_publicacion = cv.ID_publicacion 
      JOIN usuario u ON cv.ID_usuario = u.ID_usuario
      WHERE c.ID_usuario = $1`,
      [id_usuario]
    );
    
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error al obtener carrito:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});
// Endpoint para eliminar un artículo del carrito
app.delete('/eliminar-carrito', async (req: Request, res: Response) => {
  console.log('🗑️ Solicitud DELETE recibida en /eliminar-carrito');
  console.log('Body recibido:', req.body);
  
  try {
    const { ID_usuario, ID_publicacion } = req.body;
    
    // Validación de campos
    if (!ID_usuario || !ID_publicacion) {
      console.error('❌ Faltan campos requeridos');
      return res.status(400).json({ 
        error: 'IDs de usuario y publicación son obligatorios',
        received: req.body
      });
    }
    
    // Verificar existencia antes de eliminar
    const existe = await pool.query(
      'SELECT 1 FROM carrito WHERE ID_usuario = $1 AND ID_publicacion = $2',
      [ID_usuario, ID_publicacion]
    );
    
    if (existe.rows.length === 0) {
      console.error('❌ Artículo no encontrado en carrito');
      return res.status(404).json({ 
        error: 'Artículo no encontrado en el carrito',
        details: `Usuario: ${ID_usuario}, Artículo: ${ID_publicacion}`
      });
    }
    
    // Eliminar el artículo
    const result = await pool.query(
      'DELETE FROM carrito WHERE ID_usuario = $1 AND ID_publicacion = $2 RETURNING *',
      [ID_usuario, ID_publicacion]
    );
    
    console.log(`✅ Artículo eliminado:`, result.rows[0]);
    
    res.status(200).json({ 
      success: true,
      mensaje: 'Artículo eliminado del carrito',
      data: result.rows[0]
    });
    
  } catch (error) {
    console.error('❌ Error en DELETE /eliminar-carrito:', error);
    res.status(500).json({ 
      error: 'Error al eliminar del carrito',
      
    });
  }
});

//Iniciar sesion como administrador
app.post('/iniciar-administrador', async (req: Request, res: Response) =>{
  try{
    const {usuario, contraseña, contraseña2} = req.body;
    if( !usuario || !contraseña || !contraseña2){
      return res.status(400).json({error: 'usuario y contraseñas son obligatorios'});
    }
    const result = await pool.query(
      //constulta sql
      `SELECT usuario, contraseña, contraseña2 
      FROM usuarioadmin
      WHERE usuario = $1 AND contraseña = $2 AND contraseña2 =$3`,
    [usuario, contraseña, contraseña2]
    ); 
    if(result.rows.length === 0) {
      return res.status(401).json({error: 'Credenciales incorrectas'})
    }
    res.status(200).json({
      mensaje: 'Inicio de sesion exitoso',
      usuario: result.rows[0]
    })
  }catch (error){
    console.error('Error al iniciar sesion', error)
    res.status(500).json({error: 'usuario y contraseña con obligatorios'})
  }
})

//obtener usuarios - administrador
app.get('/obtener-usuarios', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
      ID_usuario as id_usuario,
      nombre,
      correo,
      telefono
      FROM usuario 
      `);
      console.log('Usuarios obtenidos:', result.rows.length);
      res.status(200).json(result.rows); // ✔️ Devuelve JSON
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error en el servidor' }); // ✔️ Siempre devuelve JSON
  }
});
//administrar publicaciones - administrador
app.get('/obtener-publicaciones/:ID_usuario', async (req, res) => {
  try {
    const { ID_usuario } = req.params;
    
    const result = await pool.query(`
      SELECT 
      cv.ID_publicacion as id,
      cv.nombre_Articulo,
      cv.descripcion,
      cv.precio,
      cv.tipo_bicicleta,
      cv.foto,
      u.nombre AS nombre_vendedor
      FROM com_ventas cv
      JOIN usuario u ON cv.ID_usuario = u.ID_usuario
      WHERE cv.ID_usuario = $1
      ORDER BY cv.ID_publicacion DESC;
      `, [ID_usuario]);
      
      console.log('Publicaciones obtenidas:', result.rows.length);
      res.status(200).json(result.rows);
      
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  //eliminar usuario - administrador
  app.delete('/eliminar-usuario/:id', async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query('DELETE FROM usuario WHERE ID_usuario = $1 RETURNING *', [id]);
      res.status(200).json({ message: "Usuario eliminado correctamente" });
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
      res.status(500).json({ error: "Error al eliminar usuario" });
    }
  });
  

  //publicaciones del usuario logueado
  app.get('/obtener-publicaciones-usuario-logueado/:ID_usuario', async (req, res) => {
    try {
    const { ID_usuario } = req.params;

    const result = await pool.query(`
      SELECT 
      cv.ID_publicacion as id,
      cv.nombre_Articulo,
      cv.descripcion,
      cv.precio,
      cv.tipo_bicicleta,
      cv.foto
      FROM com_ventas cv
      JOIN usuario u ON cv.ID_usuario = u.ID_usuario
      WHERE cv.ID_usuario = $1
      ORDER BY cv.ID_publicacion DESC;
      `, [ID_usuario]);
      
      console.log('Publicaciones obtenidas:', result.rows.length);
      res.status(200).json(result.rows);
      
    } catch (error) {
      console.error('Error al obtener publicaciones:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });
  
  //marcar como vendido
  app.delete('/marcar-vendido/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await pool.query(
        'DELETE FROM com_ventas WHERE ID_publicacion = $1 RETURNING *',
        [id]
      );
      
      if (result.rowCount === 0) {
        return res.status(404).json({ error: 'Publicación no encontrada' });
      }
      const publicacionEliminada = result.rows[0];
      console.log('Se eliminó la publicación', result.rows[0]);
      
        const compradores = await pool.query(
      `SELECT c.id_usuario, u.nombre
       FROM carrito c
       INNER JOIN usuario u ON c.id_usuario = u.id_usuario
       WHERE c.id_publicacion = $1`,
      [id]
    );

    if (compradores.rows.length > 0) {
      for (const comprador of compradores.rows) {
        const tokens = await pool.query(
          "SELECT token FROM user_tokens WHERE user_id = $1",
          [comprador.id_usuario]
        );

        if (tokens.rows.length > 0) {
          const mensajes = tokens.rows.map((t: any) => ({
            to: t.token,
            sound: "default",
            title: "Artículo vendido ❌",
            body: `El artículo "${publicacionEliminada.nombre_articulo}" ya fue vendido.`,
          }));

          const chunks = expo.chunkPushNotifications(mensajes);
          for (const chunk of chunks) {
            await expo.sendPushNotificationsAsync(chunk);
          }

          console.log(`✅ Notificación enviada al comprador: ${comprador.nombre}`);

          // 🔹 Guardar notificación en BD (para tu pantalla de notificaciones)
          await pool.query(
            `INSERT INTO notificaciones (id_usuario, titulo, cuerpo)
             VALUES ($1, $2, $3)`,
            [
              comprador.id_usuario,
              'Artículo vendido ❌',
              `El artículo "${publicacionEliminada.nombre_articulo}" ya fue vendido.`,
            ]
          );
        } else {
          console.log(`⚠️ Comprador ${comprador.id_usuario} no tiene tokens registrados`);
        }
      }
    } else {
      console.log('⚠️ Nadie tenía este artículo en el carrito');
    }

    // Limpiar carrito de esa publicación
    await pool.query('DELETE FROM carrito WHERE ID_publicacion = $1', [id]);

    // 🔹 Responder una sola vez
    res.json({
      message: 'Publicación eliminada con éxito, notificaciones enviadas y carrito limpiado',
      deleted: publicacionEliminada,
    });
  
    } catch (error) {
      console.error('Error al eliminar publicación:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  
  
  // chat gpt
app.post("/chat", async (req: Request, res: Response) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: "El campo 'message' es requerido" });
  }

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o",
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Error al llamar a OpenAI:", error);
    res.status(500).json({ error: "Error interno al conectar con OpenAI" });
  }
});

//publicaciones disponibles filtradas por bicicleta y tipo
app.get("/publicaciones", async (req: Request, res: Response) => {
  const { tipo, componente } = req.query;

  if (!tipo || !componente) {
    return res.status(400).json({ error: "Faltan parámetros: tipo y componente" });
  }

  try {
    const result = await pool.query(
      `SELECT 
        cv.ID_publicacion AS id,
        cv.nombre_Articulo AS nombre_articulo,
        cv.descripcion,
        cv.precio,
        cv.tipo_bicicleta,
        cv.tipo_componente,
        cv.foto,
        u.nombre AS nombre_vendedor,
        u.telefono
      FROM com_ventas cv
      JOIN usuario u ON cv.ID_usuario = u.ID_usuario
      WHERE LOWER(cv.tipo_bicicleta) = LOWER($1)
        AND LOWER(cv.tipo_componente) = LOWER($2)
      ORDER BY cv.ID_publicacion DESC`,
      [tipo, componente]
    );

    res.json(result.rows);
  } catch (error: any) {
    console.error("❌ Error al obtener publicaciones:", error.message);
    res.status(500).json({ error: error.message }); // 👈 así ves el error real
  }
});



app.get("/usuario/:id", async (req, res) => {
  const { id } = req.params;
  const result = await pool.query("SELECT * FROM usuario WHERE ID_usuario = $1", [id]);
  if (result.rows.length === 0) {
    return res.status(404).json({ error: "Usuario no encontrado" });
  }
  res.json(result.rows[0]);
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

