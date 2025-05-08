import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
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
    MatIconModule,
    MatMenuModule,
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
      this.router.navigate(['/auth/login']);
    } else {
      const role = this.authService.getRole();
      const currentUrl = this.router.url;

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
