import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from './core/services/auth.service';
import { Usuario } from './core/models/usuario.model';
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

  constructor(public authService: AuthService, private router: Router) {
    this.initializeUsuarios();
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit() {
    if (!this.authService.isLoggedIn()) {
      this.authService.logout();
    }
  }

  getNombreUsuario(): string {
    const user = this.authService.getCurrentUser();
    return user ? user.name : '';
  }

  private initializeUsuarios() {
    const usuariosExistentes = localStorage.getItem('usuariosRegistrados');
    if (!usuariosExistentes) {
      const usuariosIniciales: Usuario[] = [
        {
          id: 1,
          name: 'Carlos García',
          email: 'carlos@example.com',
          password: '1234',
          role: 'empresa',
          experiencia: '2 años como Frontend Developer',
          educacion: 'Grado en Ingeniería Informática',
        },
        {
          id: 2,
          name: 'Laura Fernández',
          email: 'laura@example.com',
          password: '1234',
          role: 'empresa',
          experiencia: 'CEO en DataCorp',
          educacion: 'MBA en Administración de Empresas',
        },
        {
          id: 3,
          name: 'Admin Principal',
          email: 'admin@admin.com',
          password: 'admin123',
          role: 'admin',
          experiencia: 'Administrador de Sistemas Senior',
          educacion: 'Máster en Ciberseguridad',
        },
      ];
      localStorage.setItem(
        'usuariosRegistrados',
        JSON.stringify(usuariosIniciales)
      );
    }
  }
}
