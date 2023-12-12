import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';

@Component({
  selector: 'app-historialcliente',
  templateUrl: './historialcliente.page.html',
  styleUrls: ['./historialcliente.page.scss'],
})
export class HistorialclientePage implements OnInit {

  usuarioid: number;
  historialViajes: any[] = [];

  constructor(private arouter: ActivatedRoute, private db: DbserviciosService) { }

  ngOnInit() {
    
    this.arouter.paramMap.subscribe(params => {
      const usuarioidString = params.get('usuarioid') ?? ''; // Asigna '' si params.get('usuarioid') es null
      this.usuarioid = parseInt(usuarioidString, 10) || 0; // Convierte a number, asigna 0 si la conversión falla
      console.log('Usuarioid en PerfilUsuarioPage:', this.usuarioid);

  });
  
  // Luego, puedes usar this.usuarioid para obtener el historial de viajes
  if (this.usuarioid) {
    this.db.obtenerHistorialViajesCliente(this.usuarioid).then(historialViajes => {
      console.log('Historial de viajes:', historialViajes);
      // Aquí puedes hacer lo que necesites con el historial de viajes
      this.historialViajes = historialViajes;
    }).catch(error => {
      console.error('Error al obtener historial de viajes:', error);
    });
  }
  
}



}

