import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.page.html',
  styleUrls: ['./inicio-sesion.page.scss'],
})
export class InicioSesionPage implements OnInit {
  correoElectronico: string = '';
  contrasena:string = '';
  
  constructor(private db: DbserviciosService, private router: Router) { }

  ngOnInit() {
  }

  iniciarSesion() {
    this.db.loginUsuario(this.correoElectronico, this.contrasena)
      .then(usuarioEncontrado => {
        if (usuarioEncontrado) {
          // Usuario válido, redirige a la página de perfil, envia id para uso en la imagen
          this.router.navigate(['/perfiluser'], { queryParams: { idUsuario: usuarioEncontrado.usuarioid } });
        } else {
          
          console.error('Correo o contraseña incorrectos');
        }
      })
      .catch(error => {
        console.error('Error al iniciar sesión:', error);
        // Manejo de errores, muestra mensaje de error o realiza alguna acción adecuada
      });
  }

}
