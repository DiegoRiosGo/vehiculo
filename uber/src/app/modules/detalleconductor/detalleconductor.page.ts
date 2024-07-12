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

  conductor: string;

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
            this.usuarioid = viajeData.usuarioid;

            console.log('si hay autoid 1 ', viajeData.ppartida);
            console.log('si hay autoid 2 ', viajeData.usuarioid);
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
      this.cobrocliente();
      this.pagoconductor();

      this.location.back();
    }).catch(error => {
      console.error('Error al finalizar el viaje:', error);
      // Maneja el error según tus necesidades
    });
  }


  cobrocliente() {
    this.prueba.forEach((pasajero) => {
      this.db.insertarHistorialCliente(pasajero.userid, -this.valorViaje, 'cobro de viaje')
      .then(() => {
        console.log('Pago registrado para el pasajero:', pasajero.userid);
      })
      .catch(error => {
        console.error('Error al registrar pago para el pasajero:', pasajero.userid, error);
      });
    });
  }

  // Función para pagar al conductor
  pagoconductor() {
    const totalPago = this.valorViaje * this.prueba.length;
    this.db.obtenerDatosViaje(this.idviaje).then(async (viajeData: any) => {
      const autoid = viajeData.autoid; // Asegúrate de tener el ID del vehículo
      const partida = viajeData.ppartida; // Punto de partida del viaje
      const destino = viajeData.pdestino; // Destino del viaje

      const descripcion = `Pago de viaje de ${partida} a ${destino}`;

      console.log('descripción:', autoid);
      console.log('descripción:', descripcion);

      this.db.insertarHistorialCliente(this.usuarioid, totalPago, descripcion)
          .then(() => {
            console.log('Pago registrado para el conductor:', this.usuarioid);
            console.log('Partida:', partida);
            console.log('Destino:', destino);
          })
          .catch(error => {
            console.error('Error al registrar pago para el conductor:', this.usuarioid, error);
          });
    });
  }
  
}


