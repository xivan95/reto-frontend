import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor() {}

  login(email: string, password: string) {
    // Simular un pequeño "servidor" que responde al login

    if (!email || !password) {
      return throwError(() => new Error('Credenciales inválidas'));
    }

    if (email === 'admin@email.com') {
      return of({ token: 'fake-jwt-token-admin', role: 'admin' }).pipe(
        delay(1000)
      );
    }

    if (email === 'empresa@email.com') {
      return of({ token: 'fake-jwt-token-empresa', role: 'empresa' }).pipe(
        delay(1000)
      );
    }

    if (email.endsWith('@email.com')) {
      return of({ token: 'fake-jwt-token-user', role: 'user' }).pipe(
        delay(1000)
      );
    }

    return throwError(() => new Error('Usuario no encontrado'));
  }
}
