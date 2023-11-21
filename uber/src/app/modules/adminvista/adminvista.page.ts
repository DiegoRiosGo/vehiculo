import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';

@Component({
  selector: 'app-adminvista',
  templateUrl: './adminvista.page.html',
  styleUrls: ['./adminvista.page.scss'],
})
export class AdminvistaPage implements OnInit {

  usuarioid: number;

  nombreUsuario: string;

  constructor(private router: Router,
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

    console.log('si toy antes .');
    console.log('ID de Usuario P user:', this.usuarioid);
    console.log('ID de Usuario P user:', this.usuarioid);
    this.router.navigate(['/moduser', this.usuarioid]);
    console.log('si toy.');
  }

}
