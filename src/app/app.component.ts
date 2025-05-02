import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'reto-frontend';

  constructor(public authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      //this.authService.logout(); // limpia por si acaso
      this.router.navigate(['/auth/login']);
    } else {
      // Si ya estás logueado, redirige según el rol
      const role = this.authService.getRole();
      const currentUrl = this.router.url;

      // Solo redirige si estás en la raíz o en /auth/login
      if (currentUrl === '/' || currentUrl.startsWith('/auth/login')) {
        switch (role) {
          case 'ADMIN':
            this.router.navigate(['/admin/gestionar-usuarios']);
            break;
          case 'COMPANY':
            this.router.navigate(['/empresa/vacantes']);
            break;
          default:
            this.router.navigate(['/usuario/vacantes']);
            break;
        }
      }
    }
  }

  getNombreUsuario(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.name : '';
  }
}
