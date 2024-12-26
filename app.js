import express, { json } from 'express';
import { dbconnect } from './config.js';
import {TurnosController} from "./Controllers/TurnosController.js"

const app = express();
app.use(json());

dbconnect();

app.get('/turnos', TurnosController.listarTurnos)

app.post('/solicitar-turno', TurnosController.solicitarTurno)

app.post('/asignar-fecha', TurnosController.asignarFecha)

app.post('/cambiar-estado', TurnosController.cambiarEstado)

app.listen(3001, () => {
    console.log("Servidor en el puerto 3001");
});
