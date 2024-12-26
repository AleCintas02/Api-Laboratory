import { Turno } from "../models/Turno.js";
import { TurnosRepository } from "../Repositories/turnosRepository.js";
import { PacienteRepository } from "../Repositories/pacientesRepository.js";

export class TurnosController {
    static async solicitarTurno(req, res) {
        try {
            const { nombre, apellido, dni, telefono, email, direccion } = req.body;

            let paciente = await PacienteRepository.buscarPaciente({ DNI: dni })

            if (!paciente) {
                paciente = await PacienteRepository.crearPaciente({
                    nombre,
                    apellido,
                    DNI: dni,
                    telefono,
                    email,
                    direccion
                })
            }

            if (!paciente) return res.status(400).json({ error: "No se pudo crear o encontrar el paciente" })


            const turno = await TurnosRepository.crearTurno({
                id_paciente: paciente._id,
                fecha_turno: null,
                estado: 'pendiente'
            })

            return res.status(200).json({ turno })


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


    static async cambiarEstado(req, res) {
        try {
            const { dni } = req.body
            if (!dni) {
                return res.status(400).json({ error: "El dni es obligatorio" });
            }

            const paciente = await PacienteRepository.buscarPaciente({ DNI: dni })

            if (!paciente) {
                return res.status(400).json({ error: "Paciente no encontrado" });
            }

            const turno = await TurnosRepository.buscarUltimoTurno({
                id_paciente: paciente.id,
                estado: "aceptado"
            })


            turno.estado = 'atendido'

            const turnoActualizado = await turno.save()

            return res.status(200).json({ mensaje: "Turno actualizado", turno: turnoActualizado });


        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async asignarFecha(req, res) {
        try {
            const { dni, fecha } = req.body;

            if (!dni || !fecha) {
                return res.status(400).json({ error: "El dni y la fecha son obligatorios" });
            }

            const paciente = await PacienteRepository.buscarPaciente({ DNI: dni });

            if (!paciente) {
                return res.status(400).json({ error: "Paciente no encontrado" });
            }

            const turno = await TurnosRepository.buscarUltimoTurno({
                id_paciente: paciente.id,
                estado: 'pendiente'
            });

            if (!turno) {
                return res.status(400).json({ error: "No se encontró ningún turno pendiente" });
            }

            if (turno.fecha_turno != null) {
                return res.status(400).json({ error: "Fecha ya asignada" });
            }

            turno.fecha_turno = fecha;
            turno.estado = "aceptado";

            const turnoActualizado = await turno.save();

            return res.status(200).json({ mensaje: "Turno actualizado", turno: turnoActualizado });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    static async consultarTurno(req, res) {
        try {
            const { dni } = req.body;

            if (!dni) {
                return res.status(400).json({ mensaje: "El dni es obligatorio" });
            }

            const paciente = await PacienteRepository.buscarPaciente({ DNI: dni });

            if (!paciente) {
                return res.status(400).json({ mensaje: "Paciente no encontrado" });
            }

            const turno = await TurnosRepository.buscarUltimoTurno({
                id_paciente: paciente.id,
            });

            if (!turno) {
                return res.status(404).json({ mensaje: "No se encontró ningún turno aceptado" });
            }

            return res.status(200).json({ turno: turno.fecha_turno == null ? "no asignado" : turno.fecha_turno, estado: turno.estado });

        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }




}