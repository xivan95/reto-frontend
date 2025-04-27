import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../../core/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from '../../../shared/dialog-confirmacion/dialog-confirmacion.component'; // Ajusta la ruta si es necesario


@Component({
  selector: 'app-gestionar-empresas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './gestionar-empresas.component.html',
  styleUrls: ['./gestionar-empresas.component.scss'],
})
export class GestionarEmpresasComponent {
  mostrarFormulario = false;
  empresaEditando: any = null;
  nuevaEmpresa = { nombre: '', correo: '' };

  empresas = [
    { id: 1, nombre: 'EmpresaTech', correo: 'contacto@empresatech.com' },
    { id: 2, nombre: 'DataSolutions', correo: 'info@datasolutions.com' },
    { id: 3, nombre: 'FutureWorks', correo: 'jobs@futureworks.com' },
    { id: 4, nombre: 'EmpresaTech', correo: 'contacto@empresatech.com' },
    { id: 5, nombre: 'DataSolutions', correo: 'info@datasolutions.com' },
    { id: 3, nombre: 'FutureWorks', correo: 'jobs@futureworks.com' },
  ];

  constructor(
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private dialog: MatDialog
  ) {}

  crearEmpresa() {
    if (!this.nuevaEmpresa.nombre || !this.nuevaEmpresa.correo) {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (this.empresaEditando) {
      // 🔵 Estamos editando
      this.empresaEditando.nombre = this.nuevaEmpresa.nombre;
      this.empresaEditando.correo = this.nuevaEmpresa.correo;
      this.snackBar.open('Empresa actualizada correctamente.', 'Cerrar', {
        duration: 3000,
      });
    } else {
      // 🟢 Nueva empresa
      const nueva = {
        id: Date.now(),
        nombre: this.nuevaEmpresa.nombre,
        correo: this.nuevaEmpresa.correo,
      };
      this.empresas.push(nueva);
      this.snackBar.open('Empresa creada correctamente.', 'Cerrar', {
        duration: 3000,
      });
    }

    this.empresas = [...this.empresas]; // ✅ Refrescar tabla
    this.nuevaEmpresa = { nombre: '', correo: '' }; // Limpiar
    this.empresaEditando = null; // Reset
    this.mostrarFormulario = false;
  }

  eliminarEmpresa(id: number) {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: { mensaje: '¿Estás seguro que deseas eliminar esta empresa?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.empresas = this.empresas.filter((e) => e.id !== id);
        this.snackBar.open('Empresa eliminada correctamente.', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  editarEmpresa(empresa: any) {
    this.empresaEditando = empresa;
    this.nuevaEmpresa.nombre = empresa.nombre;
    this.nuevaEmpresa.correo = empresa.correo;
    this.mostrarFormulario = true;
  }
  cancelarFormulario() {
    this.nuevaEmpresa = { nombre: '', correo: '' };
    this.empresaEditando = null;
    this.mostrarFormulario = false;
  }
}
