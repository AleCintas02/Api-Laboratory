import { Turno } from "../models/Turno.js";
import { TurnosRepository } from "../Repositories/turnosRepository.js";
import { PacienteRepository } from "../Repositories/pacientesRepository.js";

export class TurnosController {
    static async solicitarTurno(req, res) {
        try {
            const { nombre, apellido, dni, telefono, email, direccion } = req.body;

            let paciente = await PacienteRepository.buscarPaciente({DNI: dni})

            if(!paciente){
                paciente = await PacienteRepository.crearPaciente({
                    nombre,
                    apellido,
                    DNI: dni,
                    telefono,
                    email,
                    direccion
                })
            }

            if(!paciente) return res.status(400).json({error: "No se pudo crear o encontrar el paciente"})

            
            const turno = await TurnosRepository.crearTurno({
                id_paciente: paciente._id,
                fecha_turno: null,
                estado: 'pendiente'
            })

            return res.status(200).json({turno})

            
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async listarTurnos(req, res) {
        try {
            const cont = await Turno.countDocuments();

            if (cont === 0) {
                return res.status(200).json({ mensaje: "No hay turnos" });
            }

            const turnos = await TurnosRepository.listarTurnos();

            return res.status(200).json(turnos);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    
}