import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';

@Component({
  selector: 'app-detalleconductor',
  templateUrl: './detalleconductor.page.html',
  styleUrls: ['./detalleconductor.page.scss'],
})
export class DetalleconductorPage implements OnInit {

  usuarioid: number;
  autoid: number;

  viajes: any[] = [];

  ppartida: string;
  pdestino: string;
  valorViaje: number;
  cantAsientos: number;

  constructor(private router: Router, public alertController: AlertController, private arouter: ActivatedRoute, private db: DbserviciosService) { }

  ngOnInit() {
    this.arouter.paramMap.subscribe(params => {
      const usuarioidString = params.get('usuarioid') ?? '';
      this.usuarioid = parseInt(usuarioidString, 10) || 0;
      console.log('el usuario id',this.usuarioid);

      if (this.usuarioid) {
        // Obtener autoid del usuario
        this.db.obtenerVehiculoPorUsuario(this.usuarioid).then((vehiculo: any) => {
          if (vehiculo) {
            this.autoid = vehiculo.autoid;

            // Llamar a la función para obtener los detalles del viaje
            console.log('el vehiculo id',this.autoid);
            this.obtenerDetallesViaje();
          } else {
            console.log('no hay vehiculo',this.autoid);
            // Manejo si no se encuentra el vehículo
          }
        }).catch(error => {
          // Manejo de errores
        });
      }
    });
  }

  obtenerDetallesViaje() {
    // Verificar que autoid esté definido
    if (this.autoid) {
      // Llamar a la función de la base de datos para obtener detalles del viaje
      this.db.obtenerViajesPorAutoid(this.autoid).then((data) => {
          // Aquí puedes asignar los detalles del viaje a propiedades que uses en tu HTML
          // Por ejemplo, podrías tener una propiedad llamada 'detallesViaje' y asignarla aquí
          console.log('si hay autoid');

          //me falta que se vea en el html :p
          this.viajes = data;
      }).catch(error => {
        // Manejo de errores
      });
    }else{
      console.log('no hay autoid');
    }
  }


}
