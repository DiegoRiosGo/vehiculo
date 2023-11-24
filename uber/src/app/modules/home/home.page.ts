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
        .then((usuarioEncontrado: { usuarioid: number, rolid: number }) => {
          if (usuarioEncontrado) {
            console.log('ID de Usuario IS:', usuarioEncontrado.usuarioid);
    
            // Consultar el rolid y tomar acciones según el rol
            if (usuarioEncontrado.rolid === 1) {
              // Rol de administrador
              console.log('Usuario es un administrador.');
              this.router.navigate(['/adminvista', usuarioEncontrado.usuarioid]);
              // Realizar acciones específicas para un administrador si es necesario
            } else if (usuarioEncontrado.rolid === 2) {
              // Rol de alumno
              console.log('Usuario es un cliente.');
              this.router.navigate(['/perfiluser', usuarioEncontrado.usuarioid]);
            } else if (usuarioEncontrado.rolid === 3) {
              // Rol de conductor
              console.log('Usuario es un conductor.');
              this.router.navigate(['/perfilconductor', usuarioEncontrado.usuarioid]);
            }else {
              // Otro rol no manejado
              console.error('Rol no manejado:', usuarioEncontrado.rolid);
            }
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

/*
this.db.buscarUsuarioPorId(usuarioEncontrado.usuarioid).then((usuario: any) => {
            if (usuario) {
              console.log('correo antes:', usuarioEncontrado.usuarioid);
              this.usuariorol = usuario.rolid; // Asigna el rol del usuario obtenido
              console.log('correo despues:', usuarioEncontrado.usuarioid, usuario.rolid,this.usuariorol );
              this.router.navigate(['/perfiluser', usuarioEncontrado.usuarioid]);
            } else {
                // Manejo si el usuario no se encuentra
             }
          }).catch(error => {
              // Manejo de errores
          });
*/