import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  login(email: string, password: string) {
    const usuarios = JSON.parse(
      localStorage.getItem('usuariosRegistrados') || '[]'
    ) as Usuario[];

    const usuario = usuarios.find(
      (u) => u.email === email && u.password === password
    );

    if (usuario) {
      return of({
        token: 'simulated-jwt-token',
        role: usuario.role,
        user: usuario,
      }).pipe(delay(500));
    } else {
      return throwError(() => new Error('Usuario o contraseña incorrectos.'));
    }
  }
}
