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
  ],
  templateUrl: './home-admin.component.html',
  styleUrls: ['./home-admin.component.scss'],
})
export class HomeAdminComponent {
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  rolesDisponibles = ['user', 'empresa', 'admin'];
  mostrarFormularioUsuario: boolean = false;

  editarUsuario: Usuario | null = null;

  nuevoUsuario: Usuario = {
    id: 0,
    name: '',
    email: '',
    role: 'user',
  };

  usuarios: Usuario[] = [
    {
      id: 1,
      name: 'Carlos García',
      email: 'carlos@example.com',
      role: 'user',
    },
    {
      id: 2,
      name: 'Laura Fernández',
      email: 'laura@example.com',
      role: 'empresa',
    },
    {
      id: 3,
      name: 'Admin Principal',
      email: 'admin@admin.com',
      role: 'admin',
    },
  ];

  crearUsuario() {
    if (!this.nuevoUsuario.name.trim() || !this.nuevoUsuario.email.trim()) {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (this.editarUsuario) {
      // Estamos editando
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
        role: this.nuevoUsuario.role,
      };
      this.usuarios.push(nuevo);
      this.snackBar.open('Usuario creado exitosamente.', 'Cerrar', {
        duration: 3000,
      });
    }

    this.usuarios = [...this.usuarios];
    this.nuevoUsuario = { id: 0, name: '', email: '', role: 'user' };
    this.editarUsuario = null;
    this.mostrarFormularioUsuario = false;
  }

  cancelarFormularioUsuario() {
    this.nuevoUsuario = { id: 0, name: '', email: '', role: 'user' };
    this.editarUsuario = null;
    this.mostrarFormularioUsuario = false;
  }

  abrirFormularioEditar(usuario: Usuario) {
    this.editarUsuario = { ...usuario };
    this.nuevoUsuario = { ...usuario };
    this.mostrarFormularioUsuario = true;
  }

  eliminarUsuario(usuarioId: number) {
    const currentUserIdStr = localStorage.getItem('current_user_id');

    if (!currentUserIdStr) {
      this.snackBar.open(
        'Error: No se encontró ID del usuario actual.',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    const currentUserId = Number(currentUserIdStr);

    if (usuarioId === currentUserId) {
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
}
