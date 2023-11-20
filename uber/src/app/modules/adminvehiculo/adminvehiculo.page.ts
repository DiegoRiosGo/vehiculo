import { Component, OnInit } from '@angular/core';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';

@Component({
  selector: 'app-adminvehiculo',
  templateUrl: './adminvehiculo.page.html',
  styleUrls: ['./adminvehiculo.page.scss'],
})
export class AdminvehiculoPage implements OnInit {

  vehiculos: any[] = [];
  
  constructor(private servicioDB: DbserviciosService) { }

  ionViewDidEnter() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.servicioDB.obtenerVehiculos().then((data) => {
      console.log('Datos de vehiculos obtenidos:', data);
      this.vehiculos = data;
    });
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

  ngOnInit() {
  }

}
