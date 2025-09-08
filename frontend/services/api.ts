import axios from "axios";
import {URL} from '../config/UrlApi' 
const API_URL = `${URL}chat`; 


export const enviarMensajeAlBackend = async (message: string) => {
  try {
    const response = await axios.post(API_URL, { message });
    return response.data.reply;
  } catch (error: any) {
    console.error("Error al conectar con el backend:", error.message);
    return "Error en el servidor.";
  }
};