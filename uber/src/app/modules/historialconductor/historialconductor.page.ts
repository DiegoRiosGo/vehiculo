import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';

@Component({
  selector: 'app-historialconductor',
  templateUrl: './historialconductor.page.html',
  styleUrls: ['./historialconductor.page.scss'],
})
export class HistorialconductorPage implements OnInit {

  usuarioid: number;

  historialViajes: any[] = [];

  constructor(private route: ActivatedRoute, private db: DbserviciosService) { }

  ngOnInit() {
    // Obtén el usuarioid de los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const usuarioidString = params.get('usuarioid') ?? ''; // Asigna '' si params.get('usuarioid') es null
      this.usuarioid = parseInt(usuarioidString, 10) || 0; // Convierte a number, asigna 0 si la conversión falla
      console.log('Usuarioid en PerfilUsuarioPage:', this.usuarioid);
  
      // Luego, puedes usar this.usuarioid para obtener el historial de viajes
      if (this.usuarioid) {
        this.db.obtenerHistorialViajes(this.usuarioid).then(historialViajes => {
          console.log('Historial de viajes:', historialViajes);
          // Aquí puedes hacer lo que necesites con el historial de viajes
          this.historialViajes = historialViajes;
        }).catch(error => {
          console.error('Error al obtener historial de viajes:', error);
        });
      }
    });
  }
}


/*
try {
      const vehiculo = await this.db.obtenerVehiculoPorUsuario(this.usuarioid);
      this.autoid = vehiculo.autoid;

      // Obtén el historial de viajes para el autoid actual
      const historialViajes = await this.db.obtenerHistorialViajes(this.autoid);

      // Construye el mensaje para el popup
      let mensaje = 'Historial de Viajes:\n';
      historialViajes.forEach((viaje, index) => {
        mensaje += `${index + 1}. Origen: ${viaje.direccionInicio}, Destino: ${viaje.direccionDestino}\n`;
      });

      // Muestra el popup con el historial
      const alert = await this.alertController.create({
        header: 'Historial de Viajes',
        message: mensaje,
        buttons: ['OK']
      });

      await alert.present();
    } catch (error) {
      console.error('Error al obtener historial de viajes:', error);
    }
    */