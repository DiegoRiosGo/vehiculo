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

  viajeid: any;

  asientos : number; 
  autoid: number;
  idviaje: number;

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
    

  }

  //vista cliente 
  mostrarBotonBuscarConductor() {
    // Obtén el botón por su ID
    console.log('rolid:', this.idRol);
    const botonBuscaConductor = document.getElementById('botonBuscaConductor') as HTMLButtonElement;
    const botonCrearViaje = document.getElementById('botonCrearViaje') as HTMLButtonElement;
    const botonVolver = document.getElementById('botonVolver') as HTMLButtonElement;

    if (botonBuscaConductor && botonCrearViaje && botonVolver) {
      // Dependiendo del idRol, muestra o no el botón
      if (this.idRol === 2) { // Puedes ajustar el valor según el idRol deseado
        botonBuscaConductor.style.display = ''; // Muestra el botón
        botonCrearViaje.style.display = 'none'; // Oculta el botón
        botonVolver.style.display = 'none'; // Oculta el botón
      } else {
        botonCrearViaje.style.display = ''; // Muestra el botón
        botonVolver.style.display = ''; // Oculta el botón
        botonBuscaConductor.style.display = 'none'; // Oculta el botón
      }
    }
  }

  volverAlViaje(){
    this.db.obtenerUltimoIdViaje().then((viajeId: any) => {
      console.log('Viaje creado exitosamente. Id del viaje:', viajeId);
      // Puedes realizar otras acciones después de crear el viaje, si es necesario
      this.router.navigate(['/detalleconductor', viajeId]); // Aquí pasamos el ID del viaje a la página de detalleconductor
    });
  }
  //mostrar conductores
  async obtenerviajes() {
    try {
      const viajes = await this.db.obtenerViajes(); // Ajusta esto según tus necesidades
  
      const alert = await this.alertController.create({
        header: 'Selecciona un viaje',
        inputs: viajes.map((viaje) => ({
          name: `viaje-${viaje.idviaje}`,
          type: 'radio',
          label: `Viaje a ${viaje.pdestino} con valor de viaje:  ${viaje.valorViaje} `, // Modifica esta línea
          value: viaje.idviaje.toString(),
        })),
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelar');
            },
          },
          {
            text: 'Solicitar Viaje',
            handler: async (viajeId) => {
              if (!viajeId) {
                // Si no se selecciona ninguna opción, muestra un mensaje de error
                this.mostrarAlerta('Error', 'Debes seleccionar un viaje antes de continuar');
                return;
              }
  
              viajeId = parseInt(viajeId, 10);
  
              await this.agregarPasajeroAlViaje(viajeId);
  
              this.mostrarAlerta('Éxito', 'Viaje agregado correctamente');
            },
          },
        ],
      });
  
      await alert.present();
    } catch (error) {
      console.error('Error al obtener viajes con conductores:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
        console.error('Stack trace:', error.stack);
      }
      // Maneja el error según tus necesidades
    }
  }

  async agregarPasajeroAlViaje(viajeId: number) {
    try {
      // Reemplaza 1 con el valor correcto de tu usuario actual
      const usuarioId = 1;
  
      // Realiza la operación para agregar el pasajero al viaje
      await this.db.insertarPasajero(usuarioId, viajeId);
  
      console.log('Pasajero agregado al viaje correctamente.');
    } catch (error) {
      console.error('Error al agregar pasajero al viaje:', error);
      // Maneja el error según tus necesidades
    }
  }

  //vista conductor
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
            // Validar que todos los campos estén llenos
            if (this.camposVacios(data)) {
              this.mostrarAlerta('Error', 'Todos los campos deben ser completados');
            } else if (!this.validarValorViaje(data.valorViaje)) {
              this.mostrarAlerta('Error', 'El valor del viaje debe ser mayor a 1000 y menor a 101000');
            } else if (!this.validarAsientos(data.cantidadAsientos, this.usuarioid)) {
              this.mostrarAlerta('Error', 'La cantidad de asientos no es válida');
            } else {
              this.guardarViaje(data);
              
            }
          }
        }
      ]
    });
  
    await alert.present();
  }
  
  validarValorViaje(valorViaje: number): boolean {
    return valorViaje > 900 && valorViaje < 101000;
  }
  
  camposVacios(data: any): boolean {
    // Verifica si algún campo está vacío
    return Object.values(data).some(value => value === undefined || value === '');
  }
  
  mostrarAlerta(header: string, message: string) {
    this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  // Método para validar la cantidad de asientos
  async validarAsientos(cantidadAsientos: number, usuarioid: number): Promise<boolean> {
    try {
      // Obtener la información del vehículo del usuario actual
      const vehiculo = await this.db.obtenerVehiculoPorUsuario(usuarioid);
      this.asientos = vehiculo.asientos;

      if (vehiculo) {
        const asientosDisponibles = vehiculo.asientos;
        return cantidadAsientos > 0 && cantidadAsientos <= asientosDisponibles && cantidadAsientos <= vehiculo.asientos;
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
    const usuarioid = this.usuarioid;
  
    const vehiculo = await this.db.obtenerVehiculoPorUsuario(usuarioid);
    this.autoid = vehiculo.autoid;
  
    // Verifica que la cantidad de asientos no sea mayor a la cantidad de asientos disponibles
    const esCantidadValida = await this.validarAsientos(data.cantidadAsientos, usuarioid);
  
    if (esCantidadValida) {
      // Guarda la información del viaje en la tabla 'viaje'
      this.db.insertarViaje(this.autoid, data.direccionInicio, data.direccionDestino, data.valorViaje, data.cantidadAsientos)
    .then(() => {
      // Después de insertar el viaje, realiza una consulta para obtener el ID del viaje recién insertado
      this.db.obtenerUltimoIdViaje().then((viajeId: any) => {
      console.log('Viaje creado exitosamente. Id del viaje:', viajeId);
      // Puedes realizar otras acciones después de crear el viaje, si es necesario
      this.router.navigate(['/detalleconductor', viajeId]); // Aquí pasamos el ID del viaje a la página de detalleconductor
      this.mostrarAlerta('Éxito', 'Viaje creado exitosamente');
    });
  })
  .catch(error => {
    console.error('Error al crear el viaje:', error);
  });
    } else {
      // Muestra un mensaje si la cantidad de asientos es inválida
      console.log('Cantidad de asientos inválida');
      this.mostrarAlerta(
        'Error',
        'La cantidad de asientos no debe ser superior a la ingresada'
      );
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





