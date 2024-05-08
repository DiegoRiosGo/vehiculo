import { Component } from '@angular/core';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PaymentPage {

  pagosRecibidos: any[];

  constructor(private flowService: FlowService) {}

  enlaceDePago: string = "https://www.flow.cl/btn.php?token=27mhkwc";

  irAPago() {
    window.location.href = this.enlaceDePago;
  }

  ngOnInit() {
    this.obtenerPagosRecibidos();
  }

  async obtenerPagosRecibidos() {
    try {
      const response = await this.flowService.obtenerPagosRecibidos();
      this.pagosRecibidos = response.data; // Ajusta esto según la estructura real de la respuesta de la API de Flow
    } catch (error) {
      console.error('Error al obtener los pagos recibidos:', error);
    }
  }
  
}

