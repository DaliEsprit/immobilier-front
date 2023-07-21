import { Attachements } from "./Attachments.model";

export class immobilier{
    id!:number;
    status!:string;
    name!:string;
    etat!:string;
    description!:string;
    price!:number;
    userId!:number;
    roomId!:number;
    attachement: Array<Attachements> =[];
    images: Array<any> = [] ;
    nbClick!:number

}