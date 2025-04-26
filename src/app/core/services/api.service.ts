import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  login(email: string, password: string) {
    const usuariosRegistrados = JSON.parse(
      localStorage.getItem('usuariosRegistrados') || '[]'
    ) as Usuario[];

    const usuario = usuariosRegistrados.find(
      (u) => u.email === email && u.password === password
    );

    if (usuario) {
      // 🔥 Guardar usuario actual también
      localStorage.setItem('current_user', JSON.stringify(usuario));

      return of({
        token: 'simulated-jwt-token',
        role: usuario.role,
        id: usuario.id,
      }).pipe(delay(500)); // pequeño retraso para simular petición real
    } else {
      return throwError(() => new Error('Usuario o contraseña incorrectos.'));
    }
  }
}
