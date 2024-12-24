import mongoose, {Schema, model} from "mongoose"

const pacienteSchema = new Schema({
    nombre_paciente : {type: String, required: true},
    apellido_paciente : {type: String, required: true},
    DNI : {type: String, required: true},
    telefono: {type: String, required: true},
    email : {type: String, required: true},
    direccion : {type: String, required: true}
})

export const Paciente = model("Paciente", pacienteSchema)