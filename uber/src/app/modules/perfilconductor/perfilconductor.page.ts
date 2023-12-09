import { Component, NgZone, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { ClimaService } from 'src/app/services/servClima/clima.service';
import { ChangeDetectorRef } from '@angular/core';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';

@Component({
  selector: 'app-perfilconductor',
  templateUrl: './perfilconductor.page.html',
  styleUrls: ['./perfilconductor.page.scss'],
})
export class PerfilconductorPage implements OnInit {

  climaData: any;
  
  usuarioid: number;
  nombreUsuario: string;
  correoUsuario: string;

  vehiculoRegistrado: boolean = false;

  constructor(
    private router: Router,
    private aroute: ActivatedRoute,
    private alertController: AlertController,
    private api: ClimaService,
    private cdr: ChangeDetectorRef,
    private db: DbserviciosService,
  ) { }

  ngOnInit() {

    this.nombreUsuario = 'nombre random';
    this.correoUsuario = 'correo random';
    
    this.aroute.paramMap.subscribe(params => {
      // Obtén el valor de usuarioid desde los parámetros de la ruta
      const usuarioidString = params.get('usuarioid') ?? ''; // Asigna '' si params.get('usuarioid') es null
      this.usuarioid = parseInt(usuarioidString, 10) || 0; // Convierte a number, asigna 0 si la conversión falla
      console.log('Usuarioid en PerfilUsuarioPage:', this.usuarioid);

    
      if (this.usuarioid) {
        this.db.buscarUsuarioPorId(this.usuarioid).then((usuario: any) => {
          if (usuario) {
            this.nombreUsuario = usuario.nombre; // Asigna el nombre del usuario obtenido
            this.correoUsuario = usuario.correo; // Asigna el correo del usuario obtenido
          } else {
            // Manejo si el usuario no se encuentra
          }
        }).catch(error => {
          // Manejo de errores
        });
      }
    });

    // Verificar si hay un vehículo registrado para este usuario
    if (this.usuarioid) {
      this.db.verificarVehiculoRegistrado(this.usuarioid).then((existeVehiculo: boolean) => {
        this.vehiculoRegistrado = existeVehiculo;


        // Deshabilitar o ocultar los botones según la existencia del vehículo
        this.actualizarBotones();
      }).catch(error => {
        // Manejo de errores al verificar el vehículo
      });
    }
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Estás seguro de que quieres cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            // El usuario canceló el cierre de sesión
          }
        }, {
          text: 'Sí',
          handler: () => {
            // Lógica para cerrar sesión
            // Por ejemplo, redireccionar a la página de inicio de sesión
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }

  editProfile() {
    // Lógica para editar el perfil
    // Por ejemplo, redireccionar a una página de edición de perfil
    console.log('ID de Usuario P user:', this.usuarioid);
    this.router.navigate(['/moduser', this.usuarioid]);
  }

  //api clima

  obtenerclima() {
    this.api.getclima().subscribe((data) => {
      this.climaData = data;
      
      console.log('si toy.',this.climaData);
      console.log('si toy.',this.climaData.current.temp_f);

      //this.cdr.detectChanges(); // Forzar la actualización de la vista
    });
  }

  ionViewWillEnter() {
    this.obtenerclima();
  }
 

  //vehiculoo
  // Método para deshabilitar o habilitar los botones según la existencia del vehículo
  private actualizarBotones() {

    if (this.usuarioid) {
      this.db.verificarVehiculoRegistrado(this.usuarioid).then((existeVehiculo: boolean) => {
        this.vehiculoRegistrado = existeVehiculo;

        // Deshabilitar o ocultar los botones según la existencia del vehículo
        this.actualizarBotones();
      }).catch(error => {
        // Manejo de errores al verificar el vehículo
      });
    }

    const registrarVehiculoButton = document.getElementById('registrarVehiculoButton') as HTMLIonButtonElement;
    const iniciarViajeButton = document.getElementById('iniciarViajeButton') as HTMLIonButtonElement;
    const eliminarVehiculoButton = document.getElementById('eliminarVehiculoButton') as HTMLButtonElement;
    
    if (registrarVehiculoButton && iniciarViajeButton) {
      if (this.vehiculoRegistrado) {
        // Si hay un vehículo registrado, ocultar el botón de registrar vehículo

        iniciarViajeButton.disabled = false;
        eliminarVehiculoButton.style.display = '';
        registrarVehiculoButton.style.display = 'none';
      } else {
        // Si no hay un vehículo registrado, deshabilitar el botón de iniciar viaje

        iniciarViajeButton.disabled = true;
        registrarVehiculoButton.style.display = '';
        eliminarVehiculoButton.style.display = 'none';
        //si no funciona la idea crear alerta que recuerde registrar vehiculo
      }
    }

  }


  // Método modificado para mostrar un mensaje si el botón está deshabilitado
  async iniciarViajeComoConductor() {
    if (this.vehiculoRegistrado) {
      // Lógica para iniciar el viaje como conductor
      // Por ejemplo, redireccionar a la página de inicio de viaje

      this.router.navigate(['/mapa', this.usuarioid]);
    } else {
      const alert = await this.alertController.create({
        header: 'Advertencia',
        message: 'Debes registrar un vehículo primero!!',
        buttons: ['OK']
      });

      //entra en conflicto porque el botón no se puede presionar

      await alert.present();
      
      //no funciona ya que el botón se deshabilita, ver otra forma de informar
    }
  }


   //--------------------------------------------------------------
  // para borrar auto
  ionViewDidEnter() {
    this.cargarVehiculos();
  }

  cargarVehiculos() {
    this.db.obtenerVehiculos().then((data) => {
      console.log('Datos de vehiculos obtenidos:', data);
    });
  }

  async eliminarVehiculo() {
    try {
      await this.db.eliminarVehiculoporuserid(this.usuarioid);
      // Recargar la lista de vehículos después de eliminar
      console.log('Datos de vehiculos borrados:');
      this.cargarVehiculos();
      this.actualizarBotones();
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
    }
  }
 //--------------------------------------------------------------


  //mientras 
  async registrarVehiculo() {
    try {
      const vehiculoRegistrado = await this.db.verificarVehiculoRegistrado(this.usuarioid);

      if (vehiculoRegistrado) {
        const alert = await this.alertController.create({
          header: 'Registro de Vehículo',
          message: 'Ya tienes un vehículo registrado.',
          buttons: ['OK']
        });
        await alert.present();
      } else {
        const registroVehiculoAlert = await this.alertController.create({
          header: 'Registro de Vehículo',
          message: 'Completa los datos del vehículo:',
          inputs: [
            {
              name: 'patente',
              type: 'text',
              placeholder: 'Patente'
            },
            {
              name: 'asientos',
              type: 'number',
              placeholder: 'Cantidad de Asientos'
            }
          ],
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel'
            },
            {
              text: 'Registrar',
              handler: (data) => {
                // Lógica para registrar el vehículo con los datos ingresados
                const nuevoVehiculo = {
                  patente: data.patente,
                  asientos: data.asientos,
                  userid: this.usuarioid
                };
                const patenteValida = this.validarPatente(data.patente);
                const asientosValidos = this.validarAsientos(data.asientos);

                if (!patenteValida && !asientosValidos) {
                  this.mostrarAlerta('Error', 'Por favor, ingrese valores válidos para la patente y el número de asientos.');
                } else if (!patenteValida) {
                  this.mostrarAlerta('Error', 'La patente ingresada no es válida.');
                } else if (!asientosValidos) {
                  this.mostrarAlerta('Error', 'Ingrese un número de asientos válido (entre 2 y 20).');
                } else {
                  // Insertar en la tabla vehiculo
                  this.db.registrarVehiculo(nuevoVehiculo).then(() => {
                  // Mostrar mensaje de vehículo agregado
                  this.mostrarAlerta('Vehículo Agregado', 'El vehículo ha sido registrado correctamente.');
                  // Actualizar la visibilidad de los botones
                  this.actualizarBotones();
                  }).catch(error => {
                    console.error('Error al registrar vehículo:', error);
                  });
                }                
              }
            }
          ]
        });

        await registroVehiculoAlert.present();
      }
    } catch (error) {
      console.error('Error al verificar vehículo registrado:', error);
    }
  }

  // ...

  private async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  validarPatente(patente: string): boolean {
    // Expresión regular para validar una patente con 4 letras y 2 números
    const patenteRegex = /^[a-zA-Z]{4}\d{2}$/;
    return patenteRegex.test(patente);
  }

  validarAsientos(asientos: number): boolean {
    // Validar que los asientos estén en el rango de 2 a 20
    return asientos >= 1 && asientos <= 15;
  }

  // actualizar pagina cuando se actualizan los botones
  // arreglar el aviso de debe registrar primero el vehiculo en el botón inicio viaje
  // arreglar funcion actualizar botones funciona al inicio y al borrar vehiculo, 
  //pero no funciona cuando registro nuevo vehiculo
  //puede ser que no valida bien la relacion con el usuario? 
}

