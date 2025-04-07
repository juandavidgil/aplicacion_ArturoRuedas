import {pg}  from "pg"

export const pool= new pg.pool({
    host: "localhost",
    port:5432,
    database:"Arturo_Ruedas",
    user:"postgres", /* creo que toca cambiarlo  */
    password: "123"
})