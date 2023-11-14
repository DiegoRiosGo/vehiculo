import { NumericValueAccessor } from "@ionic/angular"

export class Tpreguntas {
    id: number
    pregunta: string

    constructor(
        id: number,
        pregunta: string
    ){
        this.id = id;
        this.pregunta = pregunta;
    }
}
