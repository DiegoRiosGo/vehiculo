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
    this.router.navigate(['/perfiluser']);
  }

}


/*
 // Validación de inicio de sesión
    this.db.getDataUsuario().subscribe(usuarios => {
      const usuarioEncontrado = usuarios.find(usuario => usuario.correo === this.correoElectronico && usuario.contrasena === this.contrasena);

      if (usuarioEncontrado) {

} else {
        //cambiar mensaje de consola por mensaje de Alert en html
        console.error('Correo o Contraseña incorrectos');  
      }
    });
*/