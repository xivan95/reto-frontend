import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro',
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
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      experiencia: ['', Validators.required],
      educacion: ['', Validators.required],
    });
  }

  registrar() {
    if (this.form.invalid) {
      this.snackBar.open(
        'Por favor, completa todos los campos correctamente.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
      return;
    }

    const nuevoUsuario = this.form.value;

    // 🔥 Simulación: guardamos en localStorage (o podrías llamar a un ApiService aquí)
    const usuarios = JSON.parse(
      localStorage.getItem('usuariosRegistrados') || '[]'
    );
    usuarios.push(nuevoUsuario);
    localStorage.setItem('usuariosRegistrados', JSON.stringify(usuarios));

    this.snackBar.open(
      '¡Registro exitoso! Ahora puedes iniciar sesión.',
      'Cerrar',
      {
        duration: 3000,
      }
    );

    this.router.navigate(['/auth/login']);
  }
}
