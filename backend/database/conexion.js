import {pg}  from "pg"//pool
import {express} from "express"
import {cors} from "cors"

const express = require('express');
const {Pool} = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5432; // Puedes cambiar el puerto si es necesario

// Middleware
app.use(cors());
app.use(bodyParser.json());



app.use(cors());
app.use(bodyParser.json()); /* cambio express por bodyParse */


/* 
export const pool= new pg.pool({
    host: "localhost",
    port:5432,
    database:"Arturo_Ruedas",
    user:"postgres", 
    password: "arturoruedas"
}) */


const HOLA=async()=>{
    try{
       const result=await pool.query("SELECT ID_usuario, nombre, correo, contraseña, fecha FROM usuarios;"); /* consulta  */
       console.log(result) 
    }catch(error){
        console.error(error);
    }
}
HOLA();

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log("servidor escuchado en el puerto ${PORT}")
}
)