import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ValidarEmailService } from 'src/app/services/valEmail/validar-email.service';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ask-email',
  templateUrl: './ask-email.page.html',
  styleUrls: ['./ask-email.page.scss'],
})
export class AskEmailPage implements OnInit {

  mensajes: string[] = [];
  correo: string = 'Ingrese su Correo';

  constructor(
    private location: Location,
    private valCorr: ValidarEmailService,
    private db: DbserviciosService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  goBack() {
    this.location.back();
  }

  ingresoCorreo(){

    this.mensajes = [];

    if (!this.correo) {
      this.mensajes.push('Por favor, proporciona correo electrónico y contraseña.');
      return;
    } else if (!this.validarFormatoCorreo(this.correo)) {
      this.mensajes.push('Formato de correo electrónico no válido.');
      return;
    }

    this.db.buscarusuarioPorCorreo(this.correo)
      .then((usuario: any) => {
        if (usuario) {
          const idUsuario = usuario.usuarioid;
          this.router.navigate(['/recuperar', idUsuario]);
        } else {
          this.mensajes.push('El usuario con el correo ingresado no fue encontrado.');
        }
      })
      .catch(error => {
        console.error('Error al buscar usuario por correo:', error);
        this.mensajes.push('Error al buscar usuario por correo.');
      });

  }
  private validarFormatoCorreo(correo: string): boolean {
    return this.valCorr.validaremail(correo);
  }
}
