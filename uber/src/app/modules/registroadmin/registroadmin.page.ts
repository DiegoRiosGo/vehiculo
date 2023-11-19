import { Component, OnInit } from '@angular/core';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { Rol } from 'src/app/services/models/rol';


@Component({
  selector: 'app-registroadmin',
  templateUrl: './registroadmin.page.html',
  styleUrls: ['./registroadmin.page.scss'],
})
export class RegistroadminPage implements OnInit {

  usuarios: any[] = [];
  vehiculos: any[] = [];
  pregunta3: any[] = [];
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
 
  
  ngOnInit() {
  }
}

