import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';

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
      email: [''],
      password: [''],
    });
  }

  login() {
    const { email, password } = this.form.value;

    if (!email || !password) {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    this.loading = true;

    this.apiService.login(email, password).subscribe({
      next: (response: any) => {
        this.authService.login(response.token, response.role, response.id);

        this.snackBar.open('¡Bienvenido!', 'Cerrar', { duration: 3000 });

        // 🔥 Después de guardar login, redirigimos bien
        if (response.role === 'empresa') {
          this.router.navigate(['/empresa/vacantes']);
        } else if (response.role === 'admin') {
          this.router.navigate(['/admin/gestionar-usuarios']);
        } else {
          this.router.navigate(['/auth/login']); // fallback por si acaso
        }
      },
      error: (error) => {
        this.snackBar.open(
          error.message || 'Error de autenticación.',
          'Cerrar',
          { duration: 3000 }
        );
        this.loading = false;
      },
    });
  }
}
