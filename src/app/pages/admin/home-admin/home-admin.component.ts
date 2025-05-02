import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Usuario } from '../../../core/models/usuario.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from '../../../shared/dialog-confirmacion/dialog-confirmacion.component';

@Component({
  selector: 'app-home-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
  ],
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent implements OnInit {
  rolesDisponibles = ['EMPLOYEE', 'COMPANY', 'ADMIN'];
  mostrarFormularioUsuario = false;
  editarUsuario: Usuario | null = null;

  nuevoUsuario: Usuario = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'EMPLOYEE',
    experiencia: '',
    educacion: '',
  };

  usuarios: Usuario[] = [];

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.getAllUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: () => {
        this.snackBar.open('Error al cargar los usuarios.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  crearUsuario() {
    if (!this.nuevoUsuario.name.trim() || !this.nuevoUsuario.email.trim()) {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (this.editarUsuario) {
      // Aquí iría llamada PUT al backend para editar usuario
      this.snackBar.open(
        'Funcionalidad de edición aún no implementada.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
    } else {
      // Registro usando el método existente en AuthService
      this.authService.registerUser(this.nuevoUsuario).subscribe({
        next: () => {
          this.snackBar.open('Usuario creado exitosamente.', 'Cerrar', {
            duration: 3000,
          });
          this.ngOnInit(); // recargar usuarios
          this.resetFormulario();
        },
        error: () => {
          this.snackBar.open('Error al registrar el usuario.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  cancelarFormularioUsuario() {
    this.resetFormulario();
  }

  abrirFormularioEditar(usuario: Usuario) {
    this.editarUsuario = { ...usuario };
    this.nuevoUsuario = { ...usuario };
    this.mostrarFormularioUsuario = true;
  }

  eliminarUsuario(usuarioId: number) {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: { mensaje: '¿Estás seguro que deseas eliminar este usuario?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        const currentUserStr = localStorage.getItem('current_user');
        const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

        if (!currentUser) {
          this.snackBar.open(
            'Error: No se encontró el usuario actual.',
            'Cerrar',
            { duration: 3000 }
          );
          return;
        }

        if (usuarioId === currentUser.id) {
          this.snackBar.open('No puedes eliminar tu propia cuenta.', 'Cerrar', {
            duration: 3000,
          });
          return;
        }

        // Aquí iría llamada DELETE al backend
        this.snackBar.open(
          'Funcionalidad de eliminación aún no implementada.',
          'Cerrar',
          {
            duration: 3000,
          }
        );
      }
    });
  }

  private resetFormulario() {
    this.nuevoUsuario = {
      id: 0,
      name: '',
      email: '',
      password: '',
      role: 'EMPLOYEE',
      experiencia: '',
      educacion: '',
    };
    this.editarUsuario = null;
    this.mostrarFormularioUsuario = false;
  }
}
