import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
 
  nombre: string = ''
  apellido: string = ''
  contrasena: string = ''
  con_contrasena: string = ''
  correo: string = '' 
  respuesta: string = ''
  
  constructor() {}

  ngOnInit() {
  }

  
}

