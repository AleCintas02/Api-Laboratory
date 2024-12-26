import { Turno } from "../models/Turno.js";

export class TurnosRepository{

    static async crearTurno(turnoData){
        try{
            const turno = new Turno(turnoData)
            
            return await turno.save()
        }catch(err){
            throw new Error("error al crear turno")
        }
    }

    static async listarTurnos(){
        try{
            const turnos = Turno.find()

            return turnos
        }catch(err){
            throw new Error("error al listar turnos")
        }
    }

    // static async asignarFecha(fecha){
    //     try{
    //         turno.fecha_turno = fecha;
    //         turno.estado = "aceptado";
    //     }catch(err){

    //     }
    // }


    static async cambiarEstado(turno){
        try{
            
        }catch(err){

        }
    }

    static async buscarUltimoTurno(filtro){
        try{
            return await Turno.findOne(filtro).sort({_id:-1}).exec()
        }catch(err){
            throw new Error("Error al buscar ultimo turno: " + err.message)
        }
    }

    


}