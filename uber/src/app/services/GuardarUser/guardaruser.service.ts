// Ruta: src/app/services/class/guardarusuario.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GuardarUsuarioService {
  private usuario: string = '';
  private nickname: string = '';

  setUserData(usuario: string, nombre: string) {
    this.usuario = usuario;
    this.generateNickname(nombre);
  }

  private generateNickname(nombre: string) {
    // Generar un nickname según las especificaciones
    const randomNumbers = Array.from({ length: 4 }, () => Math.floor(Math.random() * 10)).join('');
    const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';
    const randomSpecialChars = Array.from({ length: 2 }, () => specialChars[Math.floor(Math.random() * specialChars.length)]).join('');
    const firstFourLetters = nombre.slice(0, 4);

    this.nickname = `@${randomSpecialChars}${firstFourLetters}${randomNumbers}`;
  }

  getUsuario(): string {
    return this.usuario;
  }

  getNickname(): string {
    return this.nickname;
  }
}
