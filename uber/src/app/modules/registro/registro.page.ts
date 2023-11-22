import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';


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
  mensajes: string[] = [];


  constructor(private dbService: DbserviciosService, private router: Router) { }

  registrarUsuario() {

    this.mensajes = [];

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
    } else if (this.contrasena !== this.con_contrasena) {
      this.mensajes.push('Las contraseñas no coinciden');
      return;}
      else if (!this.selectedSecurityQuestion) {
      this.mensajes.push('Debes seleccionar una pregunta de seguridad');
      return;
    }else if (!this.respuesta) {
      this.mensajes.push('Campo \'Respuesta\' es obligatorio');
      return;
    } 

    // Validación de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.correo)) {
      this.mensajes.push('Correo electrónico no válido');
      return;
    }

    // Aquí puedes llamar al servicio para insertar los datos en la tabla de usuarios
    this.dbService.insertarUsuario(
      this.nombre,
      this.apellido,
      this.correo,
      this.contrasena,
      +this.selectedSecurityQuestion, // Convierte el ID de pregunta a número
      this.respuesta,
      2 // Supongamos que el rol por defecto es 2 para un usuario cliente 
    ).then(() => {
      // Éxito al insertar el usuario
      console.log('Usuario registrado exitosamente');
      this.router.navigate(['/home']);
      // Puedes redirigir a otra página o realizar alguna acción después del registro
    }).catch(error => {
      // Manejar cualquier error que ocurra al insertar el usuario
      console.error('Error al registrar usuario', error);
    });
  }

  ngOnInit() {
  }


}

