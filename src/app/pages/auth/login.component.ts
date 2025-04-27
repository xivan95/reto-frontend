import { Component, OnInit } from '@angular/core'; // 👈 Agregar OnInit
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

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
export class LoginComponent implements OnInit {
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
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const role = this.authService.getRole();
      if (role === 'admin') {
        this.router.navigate(['/admin/gestionar-usuarios']);
      } else if (role === 'empresa') {
        this.router.navigate(['/empresa/vacantes']);
      }
    }
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
        this.authService.login(response.token, response.role, response.user);

        this.snackBar.open('¡Bienvenido!', 'Cerrar', { duration: 3000 });

        if (response.role === 'admin') {
          this.router.navigate(['/admin/gestionar-usuarios']);
        } else if (response.role === 'empresa') {
          this.router.navigate(['/empresa/vacantes']);
        } else {
          this.router.navigate(['/auth/login']);
        }
      },
      error: (error) => {
        this.snackBar.open(
          error.message || 'Error de autenticación',
          'Cerrar',
          { duration: 3000 }
        );
        this.loading = false;
      },
    });
  }
}
