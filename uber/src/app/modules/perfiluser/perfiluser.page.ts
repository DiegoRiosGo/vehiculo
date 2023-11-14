import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ClimaService } from 'src/app/services/servClima/clima.service';


@Component({
  selector: 'app-perfiluser',
  templateUrl: './perfiluser.page.html',
  styleUrls: ['./perfiluser.page.scss'],
})
export class PerfiluserPage implements OnInit {

  climaData:any;
  
  constructor(private router: Router,
    private alertController: AlertController,
    private api:ClimaService
  ) { }

  ngOnInit() {
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
    this.router.navigate(['/moduser']);
  }

  //api clima

  obtenerclima(){
    this.api.getclima().subscribe((data)=>{
      this.climaData=data;
    })
  }

  ionViewWillEnterr(){
    this.obtenerclima();
  }
}
