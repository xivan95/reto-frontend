import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly ROLE_KEY = 'auth_role';
  private readonly CURRENT_USER_KEY = 'current_user';

  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.checkInitialLogin());
  public isLoggedIn$ = this._isLoggedIn$.asObservable();

  constructor(private router: Router) {}

  private checkInitialLogin(): boolean {
    const token = localStorage.getItem(this.TOKEN_KEY);
    const currentUser = localStorage.getItem(this.CURRENT_USER_KEY);
    return !!token && !!currentUser;
  }

  login(token: string, role: 'empresa' | 'admin', id: number) {
    localStorage.setItem(this.TOKEN_KEY, token);
    localStorage.setItem(this.ROLE_KEY, role);
    localStorage.setItem('current_user_id', id.toString());
    this._isLoggedIn$.next(true);
  }

  logout() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem('current_user_id');
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this._isLoggedIn$.next(false);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getRole(): 'empresa' | 'admin' | null {
    return localStorage.getItem(this.ROLE_KEY) as 'empresa' | 'admin' | null;
  }

  getCurrentUser(): Usuario | null {
    const userJson = localStorage.getItem(this.CURRENT_USER_KEY);
    if (!userJson) {
      return null;
    }
    return JSON.parse(userJson) as Usuario;
  }
}
