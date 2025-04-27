import { Component } from '@angular/core';
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
import { DialogConfirmacionComponent } from '../../../shared/dialog-confirmacion/dialog-confirmacion.component'; // Asegúrate que esté bien la ruta


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
export class HomeAdminComponent {
  rolesDisponibles = ['user', 'empresa', 'admin'];
  mostrarFormularioUsuario = false;
  editarUsuario: Usuario | null = null;

  nuevoUsuario: Usuario = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: 'user',
    experiencia: '',
    educacion: '',
  };

  usuarios: Usuario[] = [
    {
      id: 1,
      name: 'Carlos García',
      email: 'carlos@example.com',
      password: '1234',
      role: 'user',
      experiencia: '2 años como Desarrollador Frontend',
      educacion: 'Grado en Ingeniería Informática',
    },
    {
      id: 2,
      name: 'Laura Fernández',
      email: 'laura@example.com',
      password: '1234',
      role: 'empresa',
      experiencia: 'CEO de DataSolutions',
      educacion: 'MBA en Dirección de Empresas',
    },
    {
      id: 3,
      name: 'Admin Principal',
      email: 'admin@admin.com',
      password: 'admin123',
      role: 'admin',
      experiencia: '5 años como Administrador de Sistemas',
      educacion: 'Máster en Ciberseguridad',
    },
  ];

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  crearUsuario() {
    if (!this.nuevoUsuario.name.trim() || !this.nuevoUsuario.email.trim()) {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (this.editarUsuario) {
      // Editando
      const index = this.usuarios.findIndex(
        (u) => u.id === this.editarUsuario!.id
      );
      if (index !== -1) {
        this.usuarios[index] = { ...this.nuevoUsuario };
        this.snackBar.open('Usuario actualizado correctamente.', 'Cerrar', {
          duration: 3000,
        });
      }
    } else {
      // Crear nuevo
      const nuevo: Usuario = {
        id: Date.now(),
        name: this.nuevoUsuario.name.trim(),
        email: this.nuevoUsuario.email.trim(),
        password: this.nuevoUsuario.password.trim(),
        role: this.nuevoUsuario.role,
        experiencia: this.nuevoUsuario.experiencia.trim(),
        educacion: this.nuevoUsuario.educacion.trim(),
      };
      this.usuarios.push(nuevo);
      this.snackBar.open('Usuario creado exitosamente.', 'Cerrar', {
        duration: 3000,
      });
    }

    this.usuarios = [...this.usuarios];
    this.resetFormulario();
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
            {
              duration: 3000,
            }
          );
          return;
        }

        if (usuarioId === currentUser.id) {
          this.snackBar.open('No puedes eliminar tu propia cuenta.', 'Cerrar', {
            duration: 3000,
          });
          return;
        }

        this.usuarios = this.usuarios.filter((u) => u.id !== usuarioId);
        this.snackBar.open('Usuario eliminado correctamente.', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  private resetFormulario() {
    this.nuevoUsuario = {
      id: 0,
      name: '',
      email: '',
      password: '',
      role: 'user',
      experiencia: '',
      educacion: '',
    };
    this.editarUsuario = null;
    this.mostrarFormularioUsuario = false;
  }
}
