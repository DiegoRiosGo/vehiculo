import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { CamaraService } from 'src/app/services/servCamara/camara.service';
import { NgModel } from '@angular/forms';
import { Location } from '@angular/common';


@Component({
  selector: 'app-moduser',
  templateUrl: './moduser.page.html',
  styleUrls: ['./moduser.page.scss'],

})
export class ModuserPage implements OnInit {

  capturedImage: any;
  imagePath: string; // Agrega una propiedad para almacenar la ruta de la imagen en la página

  usuarioid: number;
  rolid: number;

  nombreUsuario: string;
  nuevoNombre: string; // Nuevo nombre del usuario

  mensajes: string[] = [];

  constructor(
    private location: Location,
    private cameraService: CamaraService,
    private alertController: AlertController,
    private aroute: ActivatedRoute,
    private db: DbserviciosService,
    private router: Router,
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
              this.nombreUsuario = usuario.nombre; 
              this.rolid= usuario.rolid
              // Asigna el nombre del usuario obtenido
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

    async takePicture() {
      this.capturedImage = await this.cameraService.takePicture();
      this.imagePath = this.capturedImage; // Asigna la ruta de la imagen para mostrarla en la página
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
            this.takePicture();
          }
        }
      ]
    });

    await alert.present();
  }

  guardarCambios(nuevoNombre: string) {

    this.mensajes = [];

    if (!nuevoNombre) {
      return; // Sale de la función si no hay un nuevo nombre
    }

    this.db.actualizarNombreUsuario(this.usuarioid, nuevoNombre)
      .then(() => {
        this.mensajes.push('Nombre actualizado con éxito.');
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

  //this.db.actualizarImagenUsuario(this.usuarioid, this.capturedImage);

  goBack() {
    this.location.back();
  }

}
