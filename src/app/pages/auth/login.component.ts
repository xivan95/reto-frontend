import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { LoginResponse } from '../../core/models/loginresponse.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  form: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private apiService: ApiService,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const { email, password } = this.form.value;
    this.loading = true;

    this.apiService.login(email, password).subscribe({
      next: (response: LoginResponse) => {
        this.authService.login(
          response.accessToken,
          response.refreshToken,
          response.user.role,
          response.user
        );

        this.snackBar.open('¡Bienvenido!', 'Cerrar', { duration: 3000 });

        // Redirigir según el rol
        switch (response.user.role) {
          case 'ADMIN':
            this.router.navigate(['/admin/gestionar-usuarios']);
            break;
          case 'COMPANY':
            this.router.navigate(['/empresa/vacantes']);
            break;
          default:
            this.router.navigate(['/empresa/vacantes']);
        }
      },
      error: (error) => {
        this.snackBar.open(
          error.error?.message || 'Error de autenticación',
          'Cerrar',
          { duration: 3000 }
        );
        this.loading = false;
      },
    });
  }
}
