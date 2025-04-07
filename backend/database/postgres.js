import {pool}  from "./conexion.js"

const getLanguages=async()=>{
    try{
       const result=await pool.query("SELECT ID_usuario, nombre, correo, contraseña, fecha FROM usuarios;"); /* consulta  */
       console.log(result) 
    }catch(error){
        console.error(error);
    }
}
getLanguages();