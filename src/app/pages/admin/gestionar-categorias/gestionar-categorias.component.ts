import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Categoria } from '../../../core/models/categoria.model';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from '../../../shared/dialog-confirmacion/dialog-confirmacion.component';
import { CategoriasService } from '../../../core/services/categorias.service';

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
    MatDialogModule,
  ],
  templateUrl: './gestionar-categorias.component.html',
  styleUrls: ['./gestionar-categorias.component.scss'],
})
export class GestionarCategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  nuevaCategoria: Categoria = { idCategoria: 0, nombre: '' };
  categoriaEditando: Categoria | null = null;
  mostrarFormularioCategoria: boolean = false;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private categoriasService: CategoriasService
  ) {}

  ngOnInit(): void {
    this.categoriasService.getAll().subscribe({
      next: (categorias) => (this.categorias = categorias),
      error: () =>
        this.snackBar.open('Error al cargar las categorías.', 'Cerrar', {
          duration: 3000,
        }),
    });
  }

  agregarCategoria(): void {
    if (!this.nuevaCategoria.nombre.trim()) {
      this.snackBar.open(
        'El nombre de la categoría no puede estar vacío.',
        'Cerrar',
        { duration: 3000 }
      );
      return;
    }

    if (this.categoriaEditando) {
      // Asegura que el ID no sea 0 ni undefined
      const categoriaAActualizar: Categoria = {
        ...this.nuevaCategoria,
        idCategoria: this.categoriaEditando.idCategoria, // <- esto garantiza que el ID es correcto
      };

      this.categoriasService.update(categoriaAActualizar).subscribe({
        next: () => {
          this.snackBar.open('Categoría actualizada correctamente.', 'Cerrar', {
            duration: 3000,
          });
          this.ngOnInit();
          this.resetFormulario();
        },
        error: () => {
          this.snackBar.open('Error al actualizar categoría.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    } else {
      this.categoriasService.create(this.nuevaCategoria).subscribe({
        next: () => {
          this.snackBar.open('Categoría creada exitosamente.', 'Cerrar', {
            duration: 3000,
          });
          this.ngOnInit();
          this.resetFormulario();
        },
        error: () => {
          this.snackBar.open('Error al crear categoría.', 'Cerrar', {
            duration: 3000,
          });
        },
      });
    }
  }

  editarCategoria(categoria: Categoria): void {
    console.log('[DEBUG] Editando categoría con ID:', categoria.idCategoria);
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
        this.categoriasService.delete(id).subscribe({
          next: () => {
            this.snackBar.open('Categoría eliminada correctamente.', 'Cerrar', {
              duration: 3000,
            });
            this.ngOnInit();
          },
          error: () => {
            this.snackBar.open('Error al eliminar la categoría.', 'Cerrar', {
              duration: 3000,
            });
          },
        });
      }
    });
  }

  nuevaCategoriaFormulario(): void {
    this.nuevaCategoria = { idCategoria: 0, nombre: '' };
    this.categoriaEditando = null;
    this.mostrarFormularioCategoria = true;
  }

  cancelarFormularioCategoria(): void {
    this.resetFormulario();
  }

  private resetFormulario(): void {
    this.nuevaCategoria = { idCategoria: 0, nombre: '' };
    this.categoriaEditando = null;
    this.mostrarFormularioCategoria = false;
  }
}
