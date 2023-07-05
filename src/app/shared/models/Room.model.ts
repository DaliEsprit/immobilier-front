import { User } from "./user.model";

export class Room{
    id!:number;
    minAmount:number;
    clientNumber:number;
    jetonValue:string;
    premiumRoom:boolean;
    goldRoom:boolean;
    roomStatus:string;
    immobiliereId:number;
    users:User[];
}