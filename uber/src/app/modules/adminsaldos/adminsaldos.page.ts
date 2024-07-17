import { Component, OnInit } from '@angular/core';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-adminsaldos',
  templateUrl: './adminsaldos.page.html',
  styleUrls: ['./adminsaldos.page.scss'],
})
export class AdminsaldosPage implements OnInit {

  usuariosclientes: any[] = [];

  usuariosconductores: any[] = [];
  
  constructor(public alertController: AlertController, private db: DbserviciosService) {}

  ngOnInit() {
    this.cargarUsuariosConSaldo();
    this.cargarconductorConSaldo();
  }

  async cargarUsuariosConSaldo() {
    try {
      this.usuariosclientes = await this.db.obtenerHistorialClientePorsaldoscliente();
    } catch (error) {
      console.error('Error al cargar usuarios con saldo:', error);
    }
  }

  async cargarconductorConSaldo() {
    try {
      this.usuariosconductores = await this.db.obtenerHistorialClientePorsaldosconductor();
    } catch (error) {
      console.error('Error al cargar usuarios con saldo:', error);
    }
  }

  async pagarSueldo(usuarioid: number, saldo: number) {
    try {
      await this.sueldopagado(usuarioid, saldo);
      await this.cargarconductorConSaldo(); // Actualiza la lista de conductores después de pagar el sueldo
      
      this.mostrarAlerta('Éxito', 'Sueldo pagado correctamente');
      console.log('Sueldo pagado correctamente');
    } catch (error) {
      console.error('Error al pagar sueldo:', error);
    }
  }

  async sueldopagado(usuarioid: number, saldo: number) {
    try {
      await this.db.insertarHistorialCliente(usuarioid, -saldo, 'sueldo pagado');
      console.log('Historial de sueldo pagado insertado correctamente');
    } catch (error) {
      console.error('Error al insertar historial de sueldo pagado:', error);
    }
  }


  mostrarAlerta(header: string, message: string) {
    this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    }).then(alert => alert.present());
  }

  
}