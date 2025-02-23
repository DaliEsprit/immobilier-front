import { immobilier } from "./Immobiliers.model";
import { User } from "./user.model";

export class Room{
    id!:number;
    minAmount:number=0;
    clientNumber:number=0;
    jetonValue:string;
    premiumRoom:boolean=false;
    goldRoom:boolean=false;
    roomStatus:string;
    approvedRoom!:boolean;
    timeRoom:number=0;
    immobiliere:immobilier;
    joined:boolean=false;
    users:User[];
    user:User;
}