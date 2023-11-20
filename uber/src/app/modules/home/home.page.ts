import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  correoElectronico: string = '';
  contrasena: string = '';

  constructor(private db: DbserviciosService, private router: Router, private alertController: AlertController) { }

  async ErrorAlert() {
    const alert = await this.alertController.create({
      header: 'No se pudo iniciar sesion',
      message: 'Ingrese nuevamente su correo y contraseña',
      buttons: ['Aceptar'],
    });

    await alert.present();
  }

  iniciarSesion() {
    if (!this.correoElectronico || !this.contrasena) {
      console.error('Por favor, proporciona correo electrónico y contraseña.');
      return;
    }

    if (!this.validarFormatoCorreo(this.correoElectronico)) {
      console.error('Formato de correo electrónico no válido.');
      return;
    }

    this.db.loginUsuario(this.correoElectronico, this.contrasena)
      .then((usuarioEncontrado: { usuarioid: any; }) => {
        if (usuarioEncontrado) {
          this.router.navigate(['/perfiluser'], { queryParams: { idUsuario: usuarioEncontrado.usuarioid } });
        } else {
          console.error('Correo o contraseña incorrectos');

        }
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
      });
  }

  private validarFormatoCorreo(correo: string): boolean {
    return true;
  }

  private mostrarMensajeError(mensaje: string) {
  }

}

