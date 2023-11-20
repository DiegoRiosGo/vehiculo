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
  
  constructor(private dbService: DbserviciosService, private router: Router) {}

  registrarUsuario() {
    // Verificar que las contraseñas coincidan antes de continuar
    if (this.contrasena !== this.con_contrasena) {
      // Manejar la situación en la que las contraseñas no coincidan
      console.log('Las contraseñas no coinciden');
      return;
    }

    // Verificar que se haya seleccionado una pregunta de seguridad
    if (!this.selectedSecurityQuestion) {
      // Manejar la situación en la que no se ha seleccionado una pregunta de seguridad
      console.log('Debes seleccionar una pregunta de seguridad');
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
      1 // Supongamos que el rol por defecto es 1 para un usuario común 
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

