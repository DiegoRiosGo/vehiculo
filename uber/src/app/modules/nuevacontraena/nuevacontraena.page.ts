import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';
import { ValcontraseñaService } from 'src/app/services/valContraseña/valcontraseña.service';

@Component({
  selector: 'app-nuevacontraena',
  templateUrl: './nuevacontraena.page.html',
  styleUrls: ['./nuevacontraena.page.scss'],
})
export class NuevacontraenaPage implements OnInit {

  constructor(
    private db: DbserviciosService,
    private aroute: ActivatedRoute,
    private router: Router,
    private valcontraseña: ValcontraseñaService) {}

    usuarioid: number;
    contrasena: string;
    rcontrasena: string;
    usuario: any;

  ngOnInit() {
    this.aroute.paramMap.subscribe(params => {
      const usuarioidString = params.get('usuarioid') ?? '';
      this.usuarioid = parseInt(usuarioidString, 10) || 0;
      console.log('Usuarioid en nuevacontraseña:', this.usuarioid);
    })
  }

  validarYCambiarContraseña() {
    if (this.contrasena === this.rcontrasena && this.valcontraseña.validarcontraseña(this.contrasena, 'correo', 'nombre')) {
      this.db.buscarUsuarioPorId(this.usuarioid).then((usuario: any) => {
        if (usuario) {
          this.usuario = usuario;
          // Cambiar la contraseña del usuario en la base de datos
          this.db.actualizarUsuario(
            this.usuario.usuarioid,
            this.usuario.nombre,
            this.usuario.apellido,
            this.usuario.correo,
            this.contrasena, // Actualizar la contraseña
            this.usuario.idpreguntas,
            this.usuario.respuesta,
            this.usuario.rolid,
            this.usuario.imagenperfil
          ).then(() => {
            console.log('Contrasena actualizada correctamente.');
            this.router.navigate(['/home']);
          }).catch(error => {
            console.error('Error al actualizar la contrasena:', error);
            // Manejo de errores
          });
        } else {
          console.log('No se encontró el usuario con ID:', this.usuarioid);
          // Manejar si el usuario no se encuentra
        }
      }).catch(error => {
        console.error('Error al buscar usuario por ID:', error);
        // Manejo de errores
      });
    } else {
      console.log('Las contrasenas no coinciden o no cumplen con los criterios de validación.');
      // Manejar cuando las contraseñas no coinciden o no cumplen los criterios
    }
  }
}
