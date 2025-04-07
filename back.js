const {db} = require('pg')

//Configuracion de la conexión
const db = new db({
    host: 'localhost', 
    port: 5050,
    user: 'usuario',
    password: 'arturoruedas',
    database: 'postgres'
});


//conectar a la base
db.connect()
    .then(() =>{
        console.log('conexión exitosa');
    })
    .catch((err) => {
        console.error('error de conexion', err.stack);
    });
