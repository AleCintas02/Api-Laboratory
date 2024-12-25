import express, { json } from 'express';
import { dbconnect } from './config.js';
import {TurnosController} from "./Controllers/TurnosController.js"

const app = express();
app.use(json());

dbconnect();

app.get('/turnos', TurnosController.listarTurnos)

app.post('/solicitar-turno', TurnosController.solicitarTurno)

app.listen(3001, () => {
    console.log("Servidor en el puerto 3001");
});
