import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ClimaService } from 'src/app/services/servClima/clima.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PaymentPage {

  climaData: any;
  usuarioid: number;

  historialCliente: any[] = [];
  
  constructor(
    private location: Location,
    private db: DbserviciosService, 
    private router: Router,
    private aroute: ActivatedRoute,
    private api: ClimaService
  ) {}

  ngOnInit() {
    this.aroute.paramMap.subscribe(params => {
      // Obtén el valor de usuarioid desde los parámetros de la ruta
      const usuarioidString = params.get('usuarioid') ?? ''; // Asigna '' si params.get('usuarioid') es null
      this.usuarioid = parseInt(usuarioidString, 10) || 0; // Convierte a number, asigna 0 si la conversión falla
      console.log('Usuarioid en PerfilUsuarioPage:', this.usuarioid);

    
      if (this.usuarioid) {
        this.db.buscarUsuarioPorId(this.usuarioid).then((usuario: any) => {
          if (usuario) {
            console.log('Usuarioid en tengo nombre :D', this.usuarioid);
             // Asigna el nombre del usuario obtenido
          } else {

            console.log('Usuarioid no tengo nombre :C', this.usuarioid);
            // Manejo si el usuario no se encuentra
          }
        }).catch(error => {
          // Manejo de errores
        });
        this.cargarHistorialCliente();
      }
    });
  }

  cargarHistorialCliente() {
    this.db.obtenerHistorialClientePorUsuario(this.usuarioid).then(historial => {
      this.historialCliente = historial;
    }).catch(error => {
      console.error('Error al cargar historial del cliente:', error);
    });
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


  enlaceDePago1000: string = "https://www.flow.cl/btn.php?token=27mhkwc";

  enlaceDePago2000: string = "https://www.flow.cl/btn.php?token=g4ms95u";

  enlaceDePago5000: string = "https://www.flow.cl/btn.php?token=occp2yy";

  enlaceDePago10000: string = "https://www.flow.cl/btn.php?token=ed1nk3i";


  irAPago1() {
    this.db.insertarHistorialCliente(this.usuarioid, 1000, 'Pago 1000')
    .then(() => {
      window.location.href = this.enlaceDePago1000;
    })
    .catch(error => {
      console.error('Error al insertar historial:', error);
    });
  }

  irAPago2() {
    this.db.insertarHistorialCliente(this.usuarioid, 2000, 'Pago 2000')
    .then(() => {
      window.location.href = this.enlaceDePago2000;
    })
    .catch(error => {
      console.error('Error al insertar historial 2:', error);
    });
  }

  irAPago3() {
    this.db.insertarHistorialCliente(this.usuarioid, 5000, 'Pago 5000')
    .then(() => {
      window.location.href = this.enlaceDePago5000;
    })
    .catch(error => {
      console.error('Error al insertar historial 3:', error);
    });
  }

  irAPago4() {
    this.db.insertarHistorialCliente(this.usuarioid, 10000, 'Pago 10000')
    .then(() => {
      window.location.href = this.enlaceDePago10000;
    })
    .catch(error => {
      console.error('Error al insertar historial 4:', error);
    });
  }
  

  goBack() {
    this.location.back();
  }
}

