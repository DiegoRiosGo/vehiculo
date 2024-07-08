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

  climaData: any;

  usuarioid: number;
  nombreUsuario: string;
  correoUsuario: string;

  saldoActual: number = 0; // Inicializar con 0

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
    
    this.aroute.paramMap.subscribe(params => {
      // Obtén el valor de usuarioid desde los parámetros de la ruta
      const usuarioidString = params.get('usuarioid') ?? ''; // Asigna '' si params.get('usuarioid') es null
      this.usuarioid = parseInt(usuarioidString, 10) || 0; // Convierte a number, asigna 0 si la conversión falla
      console.log('Usuarioid en PerfilUsuarioPage:', this.usuarioid);

    
      if (this.usuarioid) {
        this.db.buscarUsuarioPorId(this.usuarioid).then((usuario: any) => {
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
    console.log('ID de Usuario P user:', this.usuarioid);
    this.router.navigate(['/moduser', this.usuarioid]);
    console.log('si toy.');
  }

  //api clima

  obtenerclima() {
    this.api.getclima().subscribe((data) => {
      this.climaData = data;
      
      console.log('si toy.',this.climaData);
      console.log('si toy.',this.climaData.current.temp_f);

      //this.cdr.detectChanges(); // Forzar la actualización de la vista
    });
  }

  ionViewWillEnter() {
    this.obtenerclima();
    this.obtenerSaldo();
  }

  obtenerSaldo() {
    this.db.obtenerSaldoActual(this.usuarioid).then(saldo => {
      this.saldoActual = saldo;
    }).catch(error => {
      console.error('Error al obtener el saldo:', error);
    });
  }

  async pedirviaje() {
      this.router.navigate(['/mapa', this.usuarioid]);
  }

  async mostrarHistorialViajes() {

    const usuarioid = this.usuarioid;
    this.router.navigate(['/historialcliente', usuarioid]);
  }

  async agregarsaldo() {

    this.router.navigate(['/pagos', this.usuarioid]);
  }
}
