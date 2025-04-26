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
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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

    const usuarios = JSON.parse(
      localStorage.getItem('usuariosRegistrados') || '[]'
    );
    const usuarioEncontrado = usuarios.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!usuarioEncontrado) {
      this.snackBar.open(
        'Usuario no encontrado o credenciales incorrectas.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
      return;
    }

    // 🔥 Guardamos los datos completos del usuario actual
    localStorage.setItem('current_user', JSON.stringify(usuarioEncontrado));
    localStorage.setItem('auth_token', 'fake-jwt-token');
    localStorage.setItem('auth_role', usuarioEncontrado.role);
    localStorage.setItem('current_user_id', usuarioEncontrado.id.toString());

    this.snackBar.open('Bienvenido!', 'Cerrar', { duration: 3000 });

    if (usuarioEncontrado.role === 'admin') {
      this.router.navigate(['/admin/gestionar-usuarios']);
    } else if (usuarioEncontrado.role === 'empresa') {
      this.router.navigate(['/empresa/vacantes']);
    } else {
      this.router.navigate(['/usuario/home']);
    }
  }
}
