export class Viaje {
 id_viaje: number
 id_vehiculo:number
 ppartida: string
 sede_destino: number

 constructor(
    id_viaje:number,
    id_vehiculo: number,
    ppartida: string,
    sede_destino: number
 ){
    this.id_viaje = id_viaje;
    this.id_vehiculo = id_vehiculo;
    this.ppartida = ppartida;
    this.sede_destino = sede_destino;
 }

}

