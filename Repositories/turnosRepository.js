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

    


}