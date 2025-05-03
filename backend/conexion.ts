import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';

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
      res.status(200).json({ mensaje: 'Inicio de sesión exitoso' });
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
// Iniciar servido
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
