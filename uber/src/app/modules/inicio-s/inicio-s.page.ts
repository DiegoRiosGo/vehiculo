import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { MenuController, NavController } from '@ionic/angular';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { GuardarUsuarioService } from 'src/app/services/GuardarUser/guardaruser.service';

import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-inicio-s',
  templateUrl: './inicio-s.page.html',
  styleUrls: ['./inicio-s.page.scss'],
})
export class InicioSPage implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  usuario: string = ""
  clave: string = ""
  variableS: any = ""
  navCtrl: any;
  mensajeError: string = ""
  

  constructor(private menu: MenuController,private router: Router, private db:DbserviciosService, navCtrl: NavController, activatedRoute: ActivatedRoute, private guardarUsuarioService: GuardarUsuarioService) {
    localStorage.setItem('token', this.variableS);

  }

  ngOnInit() {
    FormsModule
    this.variableS = localStorage.getItem('token');
    // Deshabilita el deslizamiento del menú en la página
    this.menu.enable(false);
  }
  envDatos() {
    this.router.navigate(['home']);
    // Habilita nuevamente el deslizamiento del menú al salir de la página
    this.menu.enable(true);
  }

  login() {
    this.db.loginVal(this.usuario, this.clave).then((esValido => {
      if (esValido) {
        console.log('Inicio de Sesion Normal');
        const nickname = this.guardarUsuarioService.getNickname();  // Retrieve nickname from service
        this.guardarUsuarioService.setUserData(this.usuario, nickname); // Use the retrieved nickname
        this.navCtrl.navigateForward('/perfil-usuario');
      } else {
        console.log('Credenciales incorrectas')
        this.mensajeError = "Credenciales no validas"
      }
    })).catch((error) => {
      console.error('Error al validar las credenciales', error);
      this.mensajeError = "Error al validar las credenciales"
    });
  }


}
