import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { DialogConfirmacionComponent } from '../../../shared/dialog-confirmacion/dialog-confirmacion.component';
import {
  EmpresasService,
} from '../../../core/services/empresas.service';
import { AuthService } from '../../../core/services/auth.service';
import { Usuario } from '../../../core/models/usuario.model';
import { Empresa } from '../../../core/models/empresa.model';

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
    MatDialogModule,
    MatSelectModule,
  ],
  templateUrl: './gestionar-empresas.component.html',
  styleUrls: ['./gestionar-empresas.component.scss'],
})
export class GestionarEmpresasComponent implements OnInit {
  displayedColumns: string[] = [
    'razonSocial',
    'direccionFiscal',
    'pais',
    'usuario',
    'acciones',
  ];
  mostrarFormulario = false;
  empresaEditando: Empresa | null = null;
  nuevaEmpresa: Empresa = {
    idEmpresa: 0,
    razonSocial: '',
    direccionFiscal: '',
    pais: '',
    user: undefined,
  };
  empresas: Empresa[] = [];
  usuariosCompany: Usuario[] = [];

  constructor(
    private empresasService: EmpresasService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.cargarEmpresas();
    this.cargarUsuariosCompany();
  }

  cargarEmpresas(): void {
    this.empresasService.getAll().subscribe({
      next: (empresas) => (this.empresas = empresas),
      error: () =>
        this.snackBar.open('Error al cargar las empresas.', 'Cerrar', {
          duration: 3000,
        }),
    });
  }

  cargarUsuariosCompany(): void {
    this.authService.getAllUsuarios().subscribe({
      next: (usuarios) => {
        this.usuariosCompany = usuarios.filter((u) => u.role === 'COMPANY');
      },
      error: () => {
        this.snackBar.open('Error al cargar usuarios.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  crearEmpresa(): void {
    if (
      !this.nuevaEmpresa.razonSocial ||
      !this.nuevaEmpresa.direccionFiscal ||
      !this.nuevaEmpresa.pais ||
      !this.nuevaEmpresa.user?.id
    ) {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    if (this.empresaEditando) {
      this.empresasService.update(this.nuevaEmpresa).subscribe({
        next: () => {
          this.snackBar.open('Empresa actualizada correctamente.', 'Cerrar', {
            duration: 3000,
          });
          this.ngOnInit();
          this.resetFormulario();
        },
        error: () => {
          this.snackBar.open('Error al actualizar empresa.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    } else {
      this.empresasService.create(this.nuevaEmpresa).subscribe({
        next: () => {
          this.snackBar.open('Empresa creada correctamente.', 'Cerrar', {
            duration: 3000,
          });
          this.ngOnInit();
          this.resetFormulario();
        },
        error: () => {
          this.snackBar.open('Error al crear empresa.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  eliminarEmpresa(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: { mensaje: '¿Estás seguro que deseas eliminar esta empresa?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.empresasService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Empresa eliminada correctamente.', 'Cerrar', {
              duration: 3000,
            });
            this.ngOnInit();
          },
          error: () => {
            this.snackBar.open('Error al eliminar empresa.', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  editarEmpresa(empresa: Empresa): void {
    this.empresaEditando = empresa;
    this.nuevaEmpresa = { ...empresa };
    this.mostrarFormulario = true;
  }

  cancelarFormulario(): void {
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.nuevaEmpresa = {
      idEmpresa: 0,
      razonSocial: '',
      direccionFiscal: '',
      pais: '',
      user: undefined,
    };
    this.empresaEditando = null;
    this.mostrarFormulario = false;
  }
}
