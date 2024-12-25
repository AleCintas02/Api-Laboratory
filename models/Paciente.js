import mongoose, {Schema, model} from "mongoose"

const pacienteSchema = new Schema({
    nombre : {type: String, required: true},
    apellido : {type: String, required: true},
    DNI : {type: String, required: true},
    telefono: {type: String, required: true},
    email : {type: String, required: true},
    direccion : {type: String, required: true}
})

export const Paciente = model("Paciente", pacienteSchema)