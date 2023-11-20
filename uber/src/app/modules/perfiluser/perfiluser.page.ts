import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClimaService } from 'src/app/services/servClima/clima.service';
import { ChangeDetectorRef } from '@angular/core';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';


@Component({
  selector: 'app-perfiluser',
  templateUrl: './perfiluser.page.html',
  styleUrls: ['./perfiluser.page.scss'],
})
export class PerfiluserPage implements OnInit {

  climaData:any;
  idUsuario: number | null = null;
  nombreUsuario: string | null = null;
  correoUsuario: string | null = null;
  
  constructor(
    private router: Router,
    private aroute: ActivatedRoute,
    private alertController: AlertController,
    private api:ClimaService,
    private cdr: ChangeDetectorRef,
    private db: DbserviciosService
  ) { }

  ngOnInit() {
    this.aroute.params.subscribe(params => {
      this.idUsuario = params['idUsuario'];

      if (this.idUsuario) {
        this.db.buscarUsuarioPorId(this.idUsuario).then((usuario: any) => {
          if (usuario) {
            this.nombreUsuario = usuario.nombre; // Asigna el nombre del usuario obtenido
            this.correoUsuario = usuario.correo; // Asigna el correo del usuario obtenido
          } else {
            // Manejo si el usuario no se encuentra
          }
        }).catch(error => {
          // Manejo de errores
        });
      }
    });
  }
  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // El usuario canceló el cierre de sesión
          }
        }, {
          text: 'Sí',
          handler: () => {
            // Lógica para cerrar sesión
            // Por ejemplo, redireccionar a la página de inicio de sesión
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  editProfile() {
    // Lógica para editar el perfil
    // Por ejemplo, redireccionar a una página de edición de perfil
    this.router.navigate(['/moduser']);
  }

  //api clima

  obtenerclima() {
    this.api.getclima().subscribe((data) => {
      this.climaData = data;
      this.cdr.detectChanges(); // Forzar la actualización de la vista
    });
  }
  
  ionViewWillEnter() {
    this.obtenerclima();
  }

  async openRegistrarVehiculoAlert() {
    const alert = await this.alertController.create({
      header: 'Registrar Vehículo',
      inputs: [
        {
          name: 'patente',
          type: 'text',
          placeholder: 'Patente del vehículo',
        },
        {
          name: 'asientos',
          type: 'number',
          placeholder: 'Número de asientos',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Registrar',
          handler: (data) => {
            // Lógica para insertar el vehículo en la base de datos
            this.insertarVehiculoEnBD(data.patente, data.asientos);
          },
        },
      ],
    });

    await alert.present();
  }

  private insertarVehiculoEnBD(patente: string, asientos: number) {
    this.db
      .insertarVehiculo(patente, 1, asientos) // Aquí 1 es un ejemplo de un ID de usuario, debes obtener el ID del usuario actual según tu lógica.
      .then(() => {
        console.log('Vehículo registrado con éxito.');
      })
      .catch((error) => {
        console.error('Error al registrar el vehículo:', error);
      });
  }
}
