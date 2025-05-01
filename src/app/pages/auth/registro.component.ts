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
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { Usuario } from '../../core/models/usuario.model';
import { MatSelectModule } from '@angular/material/select';

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
    MatSelectModule,
  ],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      role: ['user', Validators.required],
    });
  }

  registrar() {
    if (this.form.invalid) {
      this.snackBar.open(
        'Por favor, completa todos los campos correctamente.',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    const nuevoUsuario: Usuario = {
      id: 0,
      enabled: 1,
      ...this.form.value,
    };

    this.authService.registerUser(nuevoUsuario).subscribe({
      next: () => {
        this.snackBar.open('¡Registro exitoso! Redirigiendo...', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/auth/login']);
      },
      error: (err: HttpErrorResponse) => {
        console.error(err);
        this.snackBar.open(
          'Error al registrar usuario. Inténtalo más tarde.',
          'Cerrar',
          { duration: 3000 }
        );
      },
    });
  }
}
