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
      'INSERT INTO usuraios (nombre, correo, contraseña, telefono) VALUES ($1, $2, $3, $4)',
      [nombre, correo, contraseña, telefono]
    );
    res.status(200).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar usuario:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
