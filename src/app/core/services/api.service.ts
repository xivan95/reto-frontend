import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private usuariosSimulados = [
    { id: 1, email: 'usuario1@example.com', password: '1234', role: 'user' },
    { id: 2, email: 'empresa1@example.com', password: '1234', role: 'empresa' },
    { id: 3, email: 'admin@admin.com', password: '1234', role: 'admin' },
  ];

  login(email: string, password: string) {
    const usuario = this.usuariosSimulados.find(
      (u) => u.email === email && u.password === password
    );

    if (usuario) {
      return of({
        token: 'simulated-jwt-token',
        role: usuario.role,
        id: usuario.id, // ✅ Devuelve también el ID
      }).pipe(delay(1000));
    } else {
      return throwError(() => new Error('Usuario o contraseña incorrectos.'));
    }
  }
}
