import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { AlertController } from '@ionic/angular';
import { ValidarEmailService } from 'src/app/services/valEmail/validar-email.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  correoElectronico: string = '';
  contrasena: string = '';
  mensajes: string[] = [];


  constructor(
    private db: DbserviciosService,
    private router: Router,
    private alertController: AlertController,
    private valCorr: ValidarEmailService
    ){}


  iniciarSesion() {

    this.mensajes = [];

    if (!this.correoElectronico || !this.contrasena) {
      this.mensajes.push('Por favor, proporciona correo electrónico y contraseña.');
      return;
    } else if (!this.validarFormatoCorreo(this.correoElectronico)) {
      this.mensajes.push('Formato de correo electrónico no válido.');
      return;
    }

    this.db.loginUsuario(this.correoElectronico, this.contrasena)
      .then((usuarioEncontrado: { usuarioid: number; }) => {
        if (usuarioEncontrado) {
          console.log('ID de Usuario IS:', usuarioEncontrado.usuarioid);
          this.router.navigate(['/perfiluser', usuarioEncontrado.usuarioid]);
        } else {
          this.mensajes.push('Correo o contraseña incorrectos');

        }
      })
      .catch(error => {
        this.mensajes.push('Error al iniciar sesión:', error);
      });
  }

  private validarFormatoCorreo(correo: string): boolean {
    return this.valCorr.validaremail(correo);
  }

}