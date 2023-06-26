import { immobilier } from "./Immobiliers.model";

export class Reservation{
    idRese!:string;
    immobilier!:immobilier;
    userAchId!:number;
    userSelId!:number;
    roomId!:number;
    dateReservation!:string;

}