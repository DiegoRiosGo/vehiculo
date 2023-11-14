export class Usuario {
    id_usuario: number;
    nombre: string;
    apellido:string;
    correo:  string;
    contraseña: string;
    preguntaS: number;
    respuesta: string;
    rol: number;
    imagen: Blob;
    constructor(
        id_usuario: number,
        nombre: string,
        apellido: string,
        correo:string,
        contraseña: string,
        preguntaS: number,
        respuesta: string,
        rol: number,
        imagen: Blob
    ){
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.contraseña = contraseña;
        this.preguntaS = preguntaS
        this.respuesta = respuesta
        this.rol =  rol;
        this.imagen = imagen;
    }
}

