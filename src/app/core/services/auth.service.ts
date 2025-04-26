import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'auth_role';
  private readonly CURRENT_USER_KEY = 'current_user';

  constructor(private router: Router) {}

  login(token: string, role: 'user' | 'empresa' | 'admin') {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.ROLE_KEY, role);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
    localStorage.removeItem('current_user_id');
    this.router.navigate(['/auth/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): 'user' | 'empresa' | 'admin' | null {
    return localStorage.getItem(this.ROLE_KEY) as
      | 'user'
      | 'empresa'
      | 'admin'
      | null;
  }

  getCurrentUser(): Usuario | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    if (!userJson) {
      return null;
    }
    return JSON.parse(userJson) as Usuario;
  }
}
