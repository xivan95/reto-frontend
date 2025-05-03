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

// ... importaciones igual que antes

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
    enabled: true,
  };

  usuarios: Usuario[] = [];

  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.authService.getAllUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios.filter((usuario) => usuario.enabled);
      },
      error: () =>
        this.snackBar.open('Error al cargar los usuarios.', 'Cerrar', {
          duration: 3000,
        }),
    });
  }

  guardarCambiosUsuario() {
    if (!this.nuevoUsuario.name.trim() || !this.nuevoUsuario.email.trim()) {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    console.log('[DEBUG] Enviando usuario actualizado:', this.nuevoUsuario);

    this.authService.updateUsuario(this.nuevoUsuario).subscribe({
      next: () => {
        this.snackBar.open('Usuario actualizado correctamente.', 'Cerrar', {
          duration: 3000,
        });
        this.cargarUsuarios();
        this.resetFormulario();
      },
      error: () => {
        this.snackBar.open('Error al actualizar el usuario.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  cancelarFormularioUsuario() {
    this.resetFormulario();
  }

  abrirFormularioEditar(usuario: Usuario) {
    this.editarUsuario = { ...usuario };
    this.nuevoUsuario = {
      id: usuario.id,
      name: usuario.name,
      email: usuario.email,
      role: usuario.role,
      password: '',
      experiencia: usuario.experiencia ?? '',
      educacion: usuario.educacion ?? '',
      enabled: usuario.enabled,
    };
    this.mostrarFormularioUsuario = true;
  }

  eliminarUsuario(usuarioId: number) {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: { mensaje: '¿Estás seguro que deseas eliminar este usuario?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.authService.deleteUsuario(usuarioId).subscribe({
          next: () => {
            this.snackBar.open('Usuario eliminado correctamente.', 'Cerrar', {
              duration: 3000,
            });
            this.cargarUsuarios();
          },
          error: () => {
            this.snackBar.open('Error al eliminar el usuario.', 'Cerrar', {
              duration: 3000,
            });
          },
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
      role: 'EMPLOYEE',
      experiencia: '',
      educacion: '',
      enabled: true,
    };
    this.editarUsuario = null;
    this.mostrarFormularioUsuario = false;
  }
}
