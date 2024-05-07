import { Component } from '@angular/core';
import { FlowService } from 'src/app/services/flow.service';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PaymentPage {

  constructor(private flowService: FlowService) {}

  enlaceDePago: string = "https://www.flow.cl/btn.php?token=27mhkwc";

  irAPago() {
    window.location.href = this.enlaceDePago;
  }

  
}

