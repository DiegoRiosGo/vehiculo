import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { CamaraService } from 'src/app/services/servCamara/camara.service';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-moduser',
  templateUrl: './moduser.page.html',
  styleUrls: ['./moduser.page.scss'],

})
export class ModuserPage implements OnInit {

  capturedImage: any;

  usuarioid: number;

  nombreUsuario: string;
  nuevoNombre: string; // Nuevo nombre del usuario

  constructor(
    private cameraService: CamaraService,
    private alertController: AlertController,
    private aroute: ActivatedRoute,
    private db: DbserviciosService
    ) { }

    ngOnInit() {
      this.aroute.paramMap.subscribe(params => {
        // Obtén el valor de usuarioid desde los parámetros de la ruta
        const usuarioidString = params.get('usuarioid') ?? ''; // Asigna '' si params.get('usuarioid') es null
        this.usuarioid = parseInt(usuarioidString, 10) || 0; // Convierte a number, asigna 0 si la conversión falla
        console.log('Usuarioid en PerfilUsuarioPage:', this.usuarioid);

        if (this.usuarioid) {
          this.db.buscarUsuarioPorId(this.usuarioid).then((usuario: any) => {
            if (usuario) {
              this.nombreUsuario = usuario.nombre; // Asigna el nombre del usuario obtenido
              console.log('Usuarioid en PerfilUsuarioPage:', this.nombreUsuario);
            } else {
              // Manejo si el usuario no se encuentra
            }
          }).catch(error => {
            // Manejo de errores
          });
        }
      });
    }

    async takePicture2() {
      this.capturedImage = await this.cameraService.takePicture();
    }
    async takePicture() {
      try {
        // Capturar la imagen (asegúrate de que esta función devuelva una URL base64)
        const imagenBase64 = await this.cameraService.takePicture();
    
        // Verifica si hay una imagen capturada antes de intentar guardarla
        if (imagenBase64) {
          // Convierte la URL base64 en un Blob
          const imagenBlob = await this.base64ToBlob(imagenBase64);
    
          // Llama al servicio para insertar la imagen en la base de datos
          await this.db.insertarImagen(this.usuarioid, imagenBlob);
          console.log('Imagen guardada en la base de datos.');
          
          // Actualiza la propiedad capturedImage si es necesario
          this.capturedImage = URL.createObjectURL(imagenBlob);
        }
      } catch (error) {
        console.error('Otras propiedades del error:', error);
      }
    }

    // Función para convertir una URL base64 en un Blob
base64ToBlob(base64: string): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const byteCharacters = atob(base64);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: 'image/jpeg' }); // Ajusta el tipo según sea necesario

    resolve(blob);
  });
}
  // Agrega esta función para convertir la imagen a Blob
convertirImagenABlob(imagenDataUrl: string){
  return fetch(imagenDataUrl)
    .then(response => response.blob());
}

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Cambiar Foto de Perfil',
      message: '¿Quiere cambiar su foto de perfil?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No desea cambiar la foto');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.takePicture2();
          }
        }
      ]
    });

    await alert.present();
  }

  

  guardarCambios2(usuarioid: number, nuevoNombre: string) {
    this.db.actualizarNombreUsuario(usuarioid, nuevoNombre)
      .then(() => {
        console.log('nombre actualizado con éxito.');
        // Actualiza la variable local de usuarios con los datos actualizados
        this.db.obtenerUsuarios().then(usuarios => {
        this.nombreUsuario = nuevoNombre ;
      });
      })
      .catch(error => {
        console.error('Error al actualizar el rol:', error);
        // Maneja el error de acuerdo a tus necesidades.
      });
  
  }

  guardarCambios(nuevoNombre: string) {
    this.db.actualizarNombreUsuario(this.usuarioid, nuevoNombre)
      .then(() => {
        console.log('Nombre actualizado con éxito.');
        console.log(this.nombreUsuario);
        console.log(nuevoNombre);
        // Actualiza la variable local de usuarios con los datos actualizados
        this.nombreUsuario = nuevoNombre;

        this.db.obtenerUsuarios().then(usuarios => {
          this.nombreUsuario = nuevoNombre;
        });
      })
      .catch(error => {
        console.error('Error al actualizar el nombre:', error);
        // Maneja el error de acuerdo a tus necesidades.
      });
  }
}
