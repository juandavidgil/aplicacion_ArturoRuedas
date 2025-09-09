import axios from "axios";
import {URL} from '../config/UrlApi' 





export const enviarMensajeAlBackend = async (message: string) => {
  try {
    const response = await axios.post(`${URL}chat`, { message });
    return response.data.reply;
  } catch (error: any) {
    console.error("Error al conectar con el backend:", error.message);
    return "Error en el servidor.";
  }
};

