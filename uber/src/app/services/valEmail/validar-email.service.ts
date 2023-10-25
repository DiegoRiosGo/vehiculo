import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidarEmailService {

  constructor() { }
  
  validaremail(email: string): boolean {
    // Expresión regular para validar un correo electrónico
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
  }
}
