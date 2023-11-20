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

  registrarVehiculoBloqueado: boolean = false;

  climaData: any;
  idUsuario: number | null = null;
  nombreUsuario: string | null = null;
  correoUsuario: string | null = null;

  constructor(
    private router: Router,
    private aroute: ActivatedRoute,
    private alertController: AlertController,
    private api: ClimaService,
    private cdr: ChangeDetectorRef,
    private db: DbserviciosService
  ) { }

  ngOnInit() {

    this.nombreUsuario = 'nombre random';
    this.correoUsuario = 'correo random';

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
    console.log('ID de Usuario:', this.idUsuario);
    this.router.navigate(['/moduser', this.idUsuario]);
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
            const patenteValida = this.validarPatente(data.patente);
            const asientosValidos = this.validarAsientos(data.asientos);     

            if (!patenteValida && !asientosValidos) {
              this.presentAlert('Error', 'Por favor, ingrese valores válidos para la patente y el número de asientos.');
            } else if (!patenteValida) {
              this.presentAlert('Error', 'La patente ingresada no es válida.');
            } else if (!asientosValidos) {
              this.presentAlert('Error', 'Ingrese un número de asientos válido (entre 2 y 20).');
            } else {
              this.insertarVehiculoEnBD(data.patente, data.asientos);
              this.registrarVehiculoBloqueado = true; // Deshabilitar el botón
            }
          },
        },
      ],
    });

    await alert.present();
  }
  validarPatente(patente: string): boolean {
    // Expresión regular para validar una patente con 4 letras y 2 números
    const patenteRegex = /^[a-zA-Z]{4}\d{2}$/;
    return patenteRegex.test(patente);
  }

  validarAsientos(asientos: number): boolean {
    // Validar que los asientos estén en el rango de 2 a 20
    return asientos >= 2 && asientos <= 15;
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            this.openRegistrarVehiculoAlert();
          },
        },
      ],
    });
    await alert.present();
  }


  private insertarVehiculoEnBD(patente: string, asientos: number) {
    this.db
      .insertarVehiculo(patente, 1, asientos)
      .then(() => {
        console.log('Vehículo registrado con éxito.');
      })
      .catch((error) => {
        console.error('Error al registrar el vehículo:', error);
      })
      .finally(() => {
        // Habilitar el botón nuevamente después de finalizar el registro
        this.registrarVehiculoBloqueado = false;
      });
  }
}
