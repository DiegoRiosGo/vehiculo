import { Component, OnInit } from '@angular/core';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';



@Component({
  selector: 'app-registroadmin',
  templateUrl: './registroadmin.page.html',
  styleUrls: ['./registroadmin.page.scss'],
})
export class RegistroadminPage implements OnInit {

  usuarios: any[] = [];

  vehiculos: any[] = [];

  pregunta3: any[] = [];
  nuevaPregunta: string = ''; // Variable para almacenar la nueva pregunta

  roles: any[] = [];

  constructor(private servicioDB: DbserviciosService) {
    this.initializeDatabase();
  }

  initializeDatabase() {
    this.servicioDB.createTable().then(() => {
      console.log('Tabla creada con éxito');
      this.servicioDB.insertData().then(() => {
        console.log('Datos insertados con éxito');
        this.loadRoles();
        this.cargarUsuarios();
        this.cargarVehiculos();
        this.cargarPreguntas();

      });
    });
  }

  loadRoles() {
    this.servicioDB.obtenerRoles().then((data) => {
      this.roles = data;
    });
  }

  cargarUsuarios() {
    this.servicioDB.obtenerUsuarios().then((data) => {
      console.log('Datos de usuarios obtenidos:', data);
      this.usuarios = data;
    });
  }

  cargarPreguntas() {
    this.servicioDB.obtenerPreguntas().then((data) => {
      this.pregunta3 = data;
    });
  }

  cargarVehiculos() {
    this.servicioDB.obtenerVehiculos().then((data) => {
      console.log('Datos de vehiculos obtenidos:', data);
      this.vehiculos = data;
    });
  }
 
  async eliminarUsuario(usuarioid: number) {
    try {
      await this.servicioDB.eliminarUsuario(usuarioid);
      // Recargar la lista de usuarios después de eliminar
      this.cargarUsuarios();
    } catch (error) {
      console.error('Error al eliminar usuario:', error);
    }
  }

  async eliminarVehiculo(autoid: number) {
    try {
      await this.servicioDB.eliminarVehiculo(autoid);
      // Recargar la lista de vehículos después de eliminar
      console.log('Datos de vehiculos borrados:');
      this.cargarVehiculos();
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
    }
  }

  async eliminarPregunta(autoid: number) {
    try {
      await this.servicioDB.eliminarPregunta(autoid);
      // Recargar la lista de preguntas después de eliminar
      console.log('Datos de preguntas borrados:');
      this.cargarPreguntas();
    } catch (error) {
      console.error('Error al eliminar pregunta:', error);
    }
  }

  async agregarPregunta() {
    try {
      // Validar que la nueva pregunta no esté vacía
      if (this.nuevaPregunta.trim() !== '') {
        await this.servicioDB.insertarPregunta(this.nuevaPregunta);
        // Recargar la lista de preguntas después de insertar
        this.cargarPreguntas();
        // Limpiar el campo de nueva pregunta
        this.nuevaPregunta = '';
      }
    } catch (error) {
      console.error('Error al agregar pregunta:', error);
    }
  }

  ngOnInit() {
  }
}

