import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  // Variables para almacenar los datos del formulario
  nombre: string = '';
  apellido: string = '';
  correo: string = '';
  contrasena: string = '';
  con_contrasena: string = '';
  selectedSecurityQuestion: string = ''; // Aquí almacenaremos el ID de la pregunta seleccionada
  respuesta: string = '';
  selectedRole: number = 0; // Variable para almacenar el rol seleccionado por el usuario
  mensajes: string[] = [];


  constructor(private alertController: AlertController,
    private dbService: DbserviciosService, private router: Router) { }

  registrarUsuario() {
    this.mensajes = [];

    // Validar que se haya seleccionado un rol
    if (this.selectedRole === 0) {
      this.mensajes.push('Debes seleccionar un rol antes de registrarte.');
      return;
    }

    // Verificar que las contraseñas coincidan antes de continuar
    if (this.contrasena !== this.con_contrasena) {
      this.mensajes.push('Las contraseñas no coinciden');
      return;
    }
    
    if (!this.nombre) {
      this.mensajes.push('Campo \'Nombre\' es obligatorio');
      return;
    } else if (!this.apellido) {
      this.mensajes.push('Campo \'Apellido\' es obligatorio');
      return;
    } else if (!this.correo) {
      this.mensajes.push('Campo \'Correo\' es obligatorio');
      return;
    } else if (!this.contrasena) {
      this.mensajes.push('Campo \'Contraseña\' es obligatorio');
      return;
    } else if (!this.selectedSecurityQuestion) {
      this.mensajes.push('Debes seleccionar una pregunta de seguridad');
      return;
    } else if (!this.respuesta) {
      this.mensajes.push('Campo \'Respuesta\' es obligatorio');
      return;
    }

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.correo)) {
      this.mensajes.push('Correo electrónico no válido');
      return;
    }

    // Validación de contraseña
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(this.contrasena)) {
      this.mensajes.push('La contraseña debe contener al menos 1 mayúscula, 1 minúscula, 1 número y tener al menos 8 caracteres');
      return;
    }

    // Verificar si el correo ya existe
    this.dbService.verificarCorreoExistente(this.correo).then(existe => {
      if (existe) {
        this.mensajes.push('El correo electrónico ya está registrado');
      } else {
        // Si el correo no existe, proceder con el registro
        this.dbService.insertarUsuario(
          this.nombre,
          this.apellido,
          this.correo,
          this.contrasena,
          +this.selectedSecurityQuestion,
          this.respuesta,
          this.selectedRole,
        ).then(() => {
          this.MsjRegistro();
          this.router.navigate(['/home']);
        }).catch(error => {
          console.error('Error al registrar usuario', error);
        });
      }
    }).catch(error => {
      console.error('Error al verificar correo existente', error);
    });
  }


  async MsjRegistro() {
    const alert = await this.alertController.create({
      header: 'Te damos la bienvenida',
      message: 'Usuario creado exitosamente',
      buttons: [
        {
          text: 'OK',
          role: 'ok',
          cssClass: 'primary',
          handler: (blah) => {
            // El usuario canceló el cierre de sesión
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
  }


}

