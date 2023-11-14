import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CamaraService } from 'src/app/services/servCamara/camara.service';

@Component({
  selector: 'app-moduser',
  templateUrl: './moduser.page.html',
  styleUrls: ['./moduser.page.scss'],
})
export class ModuserPage implements OnInit {

  capturedImage: any;


  constructor(private cameraService: CamaraService, private alertController: AlertController) { }

  ngOnInit() {
  }

  async takePicture() {
    this.capturedImage = await this.cameraService.takePicture();
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      header: 'Cambiar Foto de Perfil',
      message: '¿Quiere cambiar su foto de perfil?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No desea cambiar la foto');
          }
        },
        {
          text: 'Sí',
          handler: () => {
            this.takePicture();
          }
        }
      ]
    });

    await alert.present();
  }
}
