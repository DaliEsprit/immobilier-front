import { User } from "./user.model";

export class Room{
    idRoom!:number;
    maxBalance:number;
    clientNumber:number;
    immobiliereId:number;
    jetonId!:number;
    users:User[];
}