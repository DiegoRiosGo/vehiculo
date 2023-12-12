import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { Location } from '@angular/common';

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

  prueba: any[] = [];
  usuario: string;

  constructor(private location: Location,private router: Router, public alertController: AlertController, private arouter: ActivatedRoute, private db: DbserviciosService) { }

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
        this.db.obtenerPasajerosalviaje(this.idviaje).then((data) => {
          console.log('si hay viajesito 1 ', data);
          console.log('si hay viajesito siempre ', data)
          this.prueba = data;
        }).catch(error => {
          // Manejo de errores al obtener los pasajeros
        });

        
      }
    });
  }

  // Nueva función para finalizar el viaje
  finalizarViaje() {
    // Lógica para finalizar el viaje
    this.db.finalizarViaje(this.idviaje).then(() => {
      // Redirige al conductor a la vista anterior
      this.location.back();
    }).catch(error => {
      console.error('Error al finalizar el viaje:', error);
      // Maneja el error según tus necesidades
    });
  }
}


