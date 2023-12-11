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


  ppartida: string;
  pdestino: string;
  valorViaje: number;
  cantAsientos: number;

  viaje: any;
  idviaje: number;

  pasajeros: any[] = [];
  usuario: string;

  constructor(private router: Router, public alertController: AlertController, private arouter: ActivatedRoute, private db: DbserviciosService) { }

  ngOnInit() {
    this.arouter.paramMap.subscribe(params => {
      const idviajeString = params.get('idviaje') ?? '';
      this.idviaje = parseInt(idviajeString, 10) || 0;

      console.log('si hay viajeid 1 ', this.idviaje);

      if (this.idviaje) {
        // Llamada a tu servicio para obtener los datos del viaje
        this.db.obtenerDatosViaje(this.idviaje).then((viajeData: any) => {
          if (viajeData) {
            this.ppartida = viajeData.ppartida;
            this.pdestino = viajeData.pdestino;
            this.valorViaje = viajeData.valorViaje;
            this.cantAsientos = viajeData.cantAsientos;

            console.log('si hay autoid 1 ', viajeData.ppartida);
          } else {
            // Manejo si no se encuentra el viaje
          }
        }).catch(error => {
          // Manejo de errores
        });

        // Llamada a tu servicio para obtener los datos de los pasajeros por idviaje
        this.db.obtenerPasajerosPorViajeId(this.idviaje).then((pasajerosData: any) => {
          console.log('si hay viaje 1 ', pasajerosData.usuarioNombre);
          console.log('si hay viaje 1 ', pasajerosData.nombre)
          this.usuario = pasajerosData.usuarioNombre;
        }).catch(error => {
          // Manejo de errores al obtener los pasajeros
        });

        
      }
    });
  }
}


