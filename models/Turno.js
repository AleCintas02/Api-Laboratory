import mongoose, { Schema, model } from "mongoose"


const turnoSchema = new Schema({
    id_paciente: { type: mongoose.Schema.Types.ObjectId, ref: 'Pacientes', required: true },
    fecha_turno: {type: Date, default: null},
    estado: {type:String, enum: ['pendiente', 'aceptado', 'atendido'], default: 'pendiente'}
})

export const Turno = model('Turno', turnoSchema)