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
    this.router.navigate(['/perfiluser']);
  }
}

/*
// Validación de inicio de sesión
    this.db.getDataUsuario().subscribe(usuarios => {
      const usuarioEncontrado = usuarios.find(usuario => usuario.correo === this.correoElectronico && usuario.contrasena === this.contrasena);

      if (usuarioEncontrado) {
        } else {
        //cambiar mensaje de consola por mensaje de Alert en html
        console.error(this.ErrorAlert);
      }
    });
  }
  */