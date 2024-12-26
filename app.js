import express, { json } from 'express';
import { dbconnect } from './config.js';
import {TurnosController} from "./Controllers/TurnosController.js"

const app = express();
app.use(json());

dbconnect();

app.get('/turnos', TurnosController.listarTurnos)

app.post('/solicitar-turno', TurnosController.solicitarTurno)

app.post('/asignar-fecha', TurnosController.asignarFecha) //se solicita dni del paciente y la fecha para asignar

app.post('/cambiar-estado', TurnosController.cambiarEstado) //se solicita dni de paciente

app.listen(3001, () => {
    console.log("Servidor en el puerto 3001");
});
