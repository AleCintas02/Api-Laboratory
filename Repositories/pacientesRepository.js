import { Paciente } from "../models/Paciente.js";

export class PacienteRepository {
    static async crearPaciente(pacienteData) {
        try {
            const paciente = new Paciente(pacienteData);
            return await paciente.save(); // Guarda y devuelve el paciente
        } catch (err) {
            throw new Error("Error al ingresar el paciente: " + err.message);
        }
    }

    static async buscarPaciente(filtro) {
        try {

            const paciente = await Paciente.findOne(filtro)
            return  paciente
        
        } catch (err) {
            throw new Error("Error al buscar paciente: " + err.message);
        }
    }
}