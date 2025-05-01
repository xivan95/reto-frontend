import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Categoria } from '../../../core/models/categoria.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from '../../../shared/dialog-confirmacion/dialog-confirmacion.component'; // Ajusta ruta si es necesario


@Component({
  selector: 'app-gestionar-categorias',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './gestionar-categorias.component.html',
  styleUrls: ['./gestionar-categorias.component.scss'],
})
export class GestionarCategoriasComponent {
  categorias: Categoria[] = [
    { id: 1, nombre: 'Programación' },
    { id: 2, nombre: 'Diseño' },
    { id: 3, nombre: 'Marketing' },
  ];

  nuevaCategoria: Categoria = { id: 0, nombre: '' };
  categoriaEditando: Categoria | null = null;
  mostrarFormularioCategoria: boolean = false; 

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  agregarCategoria(): void {
    if (!this.nuevaCategoria.nombre.trim()) {
      this.snackBar.open(
        'El nombre de la categoría no puede estar vacío.',
        'Cerrar',
        {
          duration: 3000,
        }
      );
      return;
    }

    if (this.categoriaEditando) {
      this.categoriaEditando.nombre = this.nuevaCategoria.nombre.trim();
      this.snackBar.open('Categoría actualizada correctamente.', 'Cerrar', {
        duration: 3000,
      });
    } else {
      const nueva: Categoria = {
        id: Date.now(),
        nombre: this.nuevaCategoria.nombre.trim(),
      };
      this.categorias = [...this.categorias, nueva];
      this.snackBar.open('Categoría creada exitosamente.', 'Cerrar', {
        duration: 3000,
      });
    }

    this.categorias = [...this.categorias];
    this.resetFormulario();
  }

  editarCategoria(categoria: Categoria): void {
    this.categoriaEditando = categoria;
    this.nuevaCategoria = { ...categoria };
    this.mostrarFormularioCategoria = true;
  }

  eliminarCategoria(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: { mensaje: '¿Estás seguro que deseas eliminar esta categoría?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.categorias = this.categorias.filter((c) => c.id !== id);
        this.snackBar.open('Categoría eliminada correctamente.', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  nuevaCategoriaFormulario(): void {
    this.nuevaCategoria = { id: 0, nombre: '' };
    this.categoriaEditando = null;
    this.mostrarFormularioCategoria = true;
  }

  cancelarFormularioCategoria(): void {
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.nuevaCategoria = { id: 0, nombre: '' };
    this.categoriaEditando = null;
    this.mostrarFormularioCategoria = false;
  }
}
