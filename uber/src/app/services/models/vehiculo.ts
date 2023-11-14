export class Vehiculo {
    idvehiculo: number
    usuario: number
    patente: string
    asientos: number

    constructor(
        idvehiculo: number,
        usuario: number,
        asientos: number,
        patente: string
    ){
        this.idvehiculo = idvehiculo
        this.usuario = usuario
        this.asientos = asientos
        this.patente = patente
    }
}
