import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'auth_role';

  constructor(private router: Router) {}

  login(token: string, role: 'user' | 'empresa' | 'admin', id: number) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.ROLE_KEY, role);
    localStorage.setItem('current_user_id', id.toString()); // ✅ AÑADIR ESTA LÍNEA
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
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
}
