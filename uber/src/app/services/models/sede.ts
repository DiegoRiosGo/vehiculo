export class Sede {
    idsede: number
    nomsede:string
    locacion: string

    constructor(
        idsede: number,
        nom_sede: string,
        locacion: string
    ){
        this.idsede = idsede;
        this.nomsede = nom_sede;
        this.locacion = locacion;
    }
}
