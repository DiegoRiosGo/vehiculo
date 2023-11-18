import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-adminvista',
  templateUrl: './adminvista.page.html',
  styleUrls: ['./adminvista.page.scss'],
})
export class AdminvistaPage implements OnInit {
<<<<<<< Updated upstream
=======
<<<<<<< HEAD

  constructor(private router: Router,
    private alertController: AlertController) { }
=======
>>>>>>> Stashed changes
  
  
  
  constructor(private router: Router,
    private alertController: AlertController,
  ) { }
<<<<<<< Updated upstream
=======
>>>>>>> aded1aed2bbba215fda795a1aa1a68a5656949d7
>>>>>>> Stashed changes

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
<<<<<<< Updated upstream
=======
<<<<<<< HEAD
=======
>>>>>>> Stashed changes

  editProfile() {
    // Lógica para editar el perfil
    // Por ejemplo, redireccionar a una página de edición de perfil
    this.router.navigate(['/moduser']);
  }
<<<<<<< Updated upstream
=======
>>>>>>> aded1aed2bbba215fda795a1aa1a68a5656949d7
>>>>>>> Stashed changes
}
