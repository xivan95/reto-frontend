import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

import { Observable } from 'rxjs';
import { LoginResponse } from '../models/loginresponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'auth_role';
  private readonly CURRENT_USER_KEY = 'current_user';
  private readonly REFRESH_TOKEN_KEY = 'refresh_token';

  // private readonly API_URL = 'https://retodam-production.up.railway.app/api/auth';
  private readonly API_URL = 'http://localhost:8080/api/auth'; // Cambia esto a tu URL de API real

  constructor(private router: Router, private http: HttpClient) {}

  // 🔐 Llamada a login en backend
  loginBackend(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.API_URL}/login`, {
      email,
      password,
    });
  }

  // 💾 Guardar datos en localStorage
  saveLoginData(response: LoginResponse) {
    localStorage.setItem(this.TOKEN_KEY, response.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, response.refreshToken);
    localStorage.setItem(this.ROLE_KEY, response.user.role);
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(response.user));
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  registerUser(user: Usuario) {
    return this.http.post(`${this.API_URL}/signup`, user, {
      responseType: 'text', // porque el backend devuelve solo un String
    });
  }

  login(
    token: string,
    refreshToken: string,
    role: 'ADMIN' | 'COMPANY' | 'EMPLOYEE',
    user: Usuario
  ) {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('refresh_token', refreshToken);
    localStorage.setItem('auth_role', role);
    localStorage.setItem('current_user', JSON.stringify(user));
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return (
      !!localStorage.getItem(this.TOKEN_KEY) &&
      !!localStorage.getItem(this.CURRENT_USER_KEY)
    );
  }

  getRole(): 'ADMIN' | 'COMPANY' | 'EMPLOYEE' | null {
    return localStorage.getItem(this.ROLE_KEY) as any;
  }

  getCurrentUser(): Usuario | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    return userJson ? JSON.parse(userJson) : null;
  }

  getAllUsuarios(): Observable<Usuario[]> {
    // return this.http.get<Usuario[]>(
    //   'https://retodam-production.up.railway.app/api/user'
    // );
    return this.http.get<Usuario[]>(
      'http://localhost:8080/api/user'
    );


  }
}
