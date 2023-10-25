import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValcontraseñaService {

  constructor() { }

  /*validara
  Asegura que al menos una letra esté presente en la cadena.
  Asegura que al menos dos caracteres especiales que no sean números estén presentes en la cadena.
  Asegura que al menos un dígito esté presente en la cadena.
  Asegura que la cadena no contenga la variable "email" (evitando similitud con el correo "email").
  Asegura que la cadena no contenga la variable "name" (evitando similitud con el nombre "nombre").
  Asegura que la cadena no contenga dígitos consecutivos idénticos.
  Asegura que la longitud de la cadena esté entre 5 y 12 caracteres.
  */

  validarcontraseña(clave: string, email: string, nombre: string): boolean {
    const noenclave = /^(?=.*[a-zA-Z])(?=.*[^a-zA-Z\d\s]{2})(?=.*\d)(?!.*\bemail\b)(?!.*\bnombre\b)(?!.*(\d)\1)(?=.{5,12}$)/;
    return noenclave.test(clave) && !this.esSimilar(clave, email, nombre);
  }
  

  private esSimilar(clave: string, email: string, nombre: string): boolean {
    const lowercaseClave = clave.toLowerCase();
    const lowercaseEmail = email.toLowerCase();
    const lowercaseNombre = nombre.toLowerCase();

    return lowercaseClave.includes(lowercaseEmail) || lowercaseClave.includes(lowercaseNombre);
  }
}
