import { Component, OnInit } from '@angular/core';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { Rol } from 'src/app/services/models/rol';


@Component({
  selector: 'app-registroadmin',
  templateUrl: './registroadmin.page.html',
  styleUrls: ['./registroadmin.page.scss'],
})
export class RegistroadminPage implements OnInit {

  arregloRol: any = [
    {
      id: '',
      nom_rol: ''
    }

  ]

  constructor(private servicioDB: DbserviciosService) {}

  ionViewDidEnter() {
    // Cargar datos de vehículos al entrar en la página
    this.loadDatarol();
  }

  loadDatarol() {
    // Cargar datos de vehículos desde el servicio
    //subscribo al observable de la BD
    this.servicioDB.dbState().subscribe(res=>{
      if(res){
        this.servicioDB.getDataRol().subscribe(datos=>{
          this.arregloRol = datos;
        })
      }
    })
  }
  
  ngOnInit() {
    this.servicioDB.dbState().subscribe(res=>{
      if(res){
        this.servicioDB.getDataRol().subscribe(datos=>{
          this.arregloRol = datos;
        })
      }
    })
  }


   /*agregarVehiculo() {
    // Llamar a la función del servicio para agregar un vehículo
    this.servicioDB.agregarVehiculo(this.nuevoVehiculo);
    // Limpiar el formulario después de agregar un vehículo
    this.nuevoVehiculo = { idvehiculo: 0, patente: '', usuario: 0, asientos: 0 };
  }

  loadDataVehiculos() {
    // Cargar datos de vehículos desde el servicio
    this.servicioDB.loadDataVehiculo();
    // Obtener datos de vehículos como Observable
    this.servicioDB.getDataVehiculo().subscribe((data) => {
      this.vehiculos = data;
    });
  }
*/
}
