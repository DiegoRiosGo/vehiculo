import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviciosService } from 'src/app/services/baseDatos/dbservicios.service';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {

  constructor(
    private location: Location,
    private aroute: ActivatedRoute,
    private router: Router,
    private db: DbserviciosService) { }

  usuarioid: number;
  preguntaS: string;
  respuestaUsuario: string;
  
  ngOnInit() {
    this.aroute.paramMap.subscribe(params => {
      const usuarioidString = params.get('usuarioid') ?? '';
      this.usuarioid = parseInt(usuarioidString, 10) || 0;
      console.log('Usuarioid en RecuperarPage:', this.usuarioid);

      if (this.usuarioid) {
        this.db.buscarPregunta(this.usuarioid).then((pregunta: string) => {
          if (pregunta) {
            this.preguntaS = pregunta;
            console.log('Pregunta de seguridad obtenida:', this.preguntaS);
            if (this.respuestaUsuario && this.preguntaS === this.respuestaUsuario) {
              console.log('¡La respuesta es correcta!');
              this.router.navigate(['/nuevacontraena', this.usuarioid]);
            } else {
              console.log('La respuesta es incorrecta.');
            }
          } else {
            console.log('No se encontró la pregunta de seguridad para el usuario con ID:', this.usuarioid);
            // Manejo si la pregunta de seguridad no se encuentra
          }
        }).catch(error => {
          console.error('Error al obtener la pregunta de seguridad:', error);
          // Manejo de errores
        });
      }
    });
  }
  
  goBack() {
    this.location.back();
  }
  

}
