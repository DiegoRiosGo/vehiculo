import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.page.html',
  styleUrls: ['./mapa.page.scss'],
})
export class MapaPage implements OnInit {

  direccionDestino: string = ''; // Variable para almacenar el valor del input

  @ViewChild('map')
  mapRef!: ElementRef<HTMLElement>;
  Map!: GoogleMap;


  constructor(private router: Router, public alertController: AlertController) { }

  ionViewWillEnter() {
    this.createmap().then(() => {
    });
  }

  ngOnInit() {
  }

  async getCurrentPosition() { //DONDE ESTOY
    const coordinates = await Geolocation.getCurrentPosition();

    return coordinates.coords;
  };

  async createmap() {
    const coordenadas = await this.getCurrentPosition();
    this.Map = await GoogleMap.create({
      id: 'my-cool-map', // Unique identifier for this map instance
      element: this.mapRef.nativeElement, // reference to the capacitor-google-map element
      apiKey: 'AIzaSyD2czNyEOEJJKQETzm1PrjLqim5HuGGvX8', // Your Google Maps API Key
      config: {
        center: {
          // The initial position to be rendered by the map
          lat: coordenadas.latitude,
          lng: coordenadas.longitude
        },
        zoom: 15, // The initial zoom level to be rendered by the map
      },
      forceCreate: true
    });

    await this.Map.addMarker({
      coordinate: {
        lat: coordenadas.latitude,
        lng: coordenadas.longitude
      },
      title: 'origen',
    })
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Seguro?',
      message: '¿Estás seguro de que la dirección es correcta?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // El usuario canceló el cierre de sesión
          }
        },
        {
          text: 'Sí',
          handler: () => {
            const alertSuccess = this.alertController.create({
              header: 'Éxito',
              message: `SE HA REGISTRADO LA RUTA A: ${this.direccionDestino}`,
              buttons: ['OK']
            }).then(alert => {
              alert.present(); // Debes presentar la alerta aquí
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async calcularRuta() {
    if (this.direccionDestino.trim() === '') {
      // Si el campo está vacío, muestra una alerta "No se ha registrado ruta"
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'No se ha registrado ruta',
        buttons: ['OK']
      });

      await alert.present();
    } else {

      this.logout();

    }
  }


}

