import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';
import { Geolocation } from '@capacitor/geolocation';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';

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
  usuarioid: number;
  idRol: number;
  mostrarinfoconductor: boolean = false;
  userconductor: any;
  rolconductor: number = 2;
  constructor(private router: Router, public alertController: AlertController, private arouter: ActivatedRoute, private db: DbserviciosService) { }

  ionViewWillEnter() {
    this.createmap().then(() => {
    });
  }

  ngOnInit() {
    this.arouter.paramMap.subscribe(params => {
      // Obtén el valor de usuarioid desde los parámetros de la ruta
      const usuarioidString = params.get('usuarioid') ?? ''; // Asigna '' si params.get('usuarioid') es null
      this.usuarioid = parseInt(usuarioidString, 10) || 0; // Convierte a number, asigna 0 si la conversión falla
      console.log('Usuarioid en PerfilUsuarioPage:', this.usuarioid);

      if (this.usuarioid) {
        this.db.buscarUsuarioPorId(this.usuarioid).then((usuario: any) => {
          if (usuario) {
            this.idRol = usuario.rolid;

            this.mostrarBotonBuscarConductor();

          } else {
            // Manejo si el usuario no se encuentra
          }
        }).catch(error => {
          // Manejo de errores
        });
      }
    });

    //this.obtenerConductores();
  }

  //vista cliente 

  mostrarBotonBuscarConductor() {
    // Obtén el botón por su ID
    console.log('rolid:', this.idRol);
    const botonBuscaConductor = document.getElementById('botonBuscaConductor') as HTMLButtonElement;
    const botonCrearViaje = document.getElementById('botonCrearViaje') as HTMLButtonElement;
    
    if (botonBuscaConductor && botonCrearViaje) {
      // Dependiendo del idRol, muestra o no el botón
      if (this.idRol === 2) { // Puedes ajustar el valor según el idRol deseado
        botonBuscaConductor.style.display = ''; // Muestra el botón
        botonCrearViaje.style.display = 'none'; // Oculta el botón
      } else {
        botonCrearViaje.style.display = ''; // Muestra el botón
        botonBuscaConductor.style.display = 'none'; // Oculta el botón
      }
    }
  }

  //mostrar 
  //mostrar informacion del ion-card-content
  async obtenerConductores() {
    const usuariosConductores = await this.db.buscarUsuariosPorRol(this.rolconductor);
    this.userconductor = usuariosConductores;
  
  }


  async IniciarViaje() {
    const alert = await this.alertController.create({
      header: 'Crear Viaje',
      inputs: [
        {
          name: 'direccionInicio',
          type: 'text',
          placeholder: 'Dirección de inicio',
        },
        {
          name: 'direccionDestino',
          type: 'text',
          placeholder: 'Dirección de destino',
        },
        {
          name: 'valorViaje',
          type: 'number',
          placeholder: 'Valor del viaje',
        },
        {
          name: 'cantidadAsientos',
          type: 'number',
          placeholder: 'Cantidad de asientos',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancelar');
          }
        },
        {
          text: 'Iniciar Viaje',
          handler: (data) => {
            this.guardarViaje(data);
          }
        }
      ]
    });

    await alert.present();
  }

  // Método para validar la cantidad de asientos
  async validarAsientos(cantidadAsientos: number, usuarioid: number): Promise<boolean> {
    try {
      // Obtener la información del vehículo del usuario actual
      const vehiculo = await this.db.obtenerVehiculoPorUsuario(usuarioid);

      if (vehiculo) {
        const asientosDisponibles = vehiculo.asientos;
        return cantidadAsientos <= asientosDisponibles;
      } else {
        console.error('No se encontró el vehículo para el usuario.');
        return false;
      }
    } catch (error) {
      console.error('Error al obtener información del vehículo:', error);
      return false;
    }
  }

   // Método para guardar la información del viaje en la base de datos
   async guardarViaje(data: any) {
    // Obtén el usuarioid según tu lógica de usuario actual
    const usuarioid = this.usuarioid; // Ajusta esto según tu lógica

    const vehiculo = await this.db.obtenerVehiculoPorUsuario(usuarioid);
    const autoid = vehiculo.autoid;

    // Verifica que la cantidad de asientos no sea mayor a la cantidad de asientos disponibles
    const esCantidadValida = await this.validarAsientos(data.cantidadAsientos, usuarioid);

    if (esCantidadValida) {

      // Guarda la información del viaje en la tabla 'viaje'
      this.db.insertarViaje(autoid, data.direccionInicio, data.direccionDestino, data.valorViaje)
        .then(() => {
          console.log('Viaje creado exitosamente');
          // Puedes realizar otras acciones después de crear el viaje, si es necesario

          this.router.navigate(['/detalleconductor']);
        })
        .catch(error => {
          console.error('Error al crear el viaje:', error);
        });
    } else {
      // Muestra un mensaje si la cantidad de asientos es inválida
      console.log('Cantidad de asientos inválida');
    }
  }





//Cosas del mapa
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

 



}


/*
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
    this.mostrarinfoconductor = true
  */
