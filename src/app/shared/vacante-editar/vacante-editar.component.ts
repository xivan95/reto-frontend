import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VacantesService } from '../../core/services/vacantes.service';
import { Vacante } from '../../core/models/vacante.model';
import { Categoria } from '../../core/models/categoria.model';
import { MatSelectModule } from '@angular/material/select';
import { CategoriasService } from '../../core/services/categorias.service';

@Component({
  selector: 'app-vacante-editar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './vacante-editar.component.html',
  styleUrls: ['./vacante-editar.component.scss'],
})
export class VacanteEditarComponent implements OnInit {
  form: FormGroup;
  vacanteId: number | undefined;
  vacante: Vacante | undefined;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private vacantesService: VacantesService,
    private categoriasService: CategoriasService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      detalles: [''],
      salario: [0, Validators.required],
      estatus: ['', Validators.required],
      destacado: [0, Validators.required],
      imagen: [''],
      categoria: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.vacanteId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarCategorias();

    this.vacantesService.getVacantePorId(this.vacanteId).subscribe({
      next: (vacante) => {
        this.vacante = vacante;
        this.form.patchValue({
          nombre: vacante.nombre,
          descripcion: vacante.descripcion,
          detalles: vacante.detalles,
          salario: vacante.salario,
          estatus: vacante.estatus,
          destacado: vacante.destacado,
          imagen: vacante.imagen,
          categoria: vacante.categoria,
        });
      },
      error: () => {
        this.snackBar.open('Vacante no encontrada.', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/empresa/vacante', this.vacanteId]);
      },
    });
  }

  cargarCategorias(): void {
    this.categoriasService.getAll().subscribe({
      next: (cats) => (this.categorias = cats),
      error: () => {
        this.snackBar.open('Error al cargar categorías.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  guardarCambios(): void {
    if (this.form.invalid || !this.vacanteId) {
      this.snackBar.open('Formulario inválido.', 'Cerrar', { duration: 3000 });
      return;
    }

    const vacanteActualizada: Vacante = {
      ...this.vacante!,
      ...this.form.value,
    };

    this.vacantesService.actualizarVacante(vacanteActualizada).subscribe(() => {
      this.snackBar.open('Vacante actualizada correctamente.', 'Cerrar', {
        duration: 3000,
      });
      this.router.navigate(['/empresa/vacante', this.vacanteId]);
    });
  }

  volver(): void {
    this.router.navigate(['/empresa/vacante', this.vacanteId]);
  }

  compararCategorias(c1: Categoria, c2: Categoria): boolean {
    return c1 && c2 ? c1.idCategoria === c2.idCategoria : c1 === c2;
  }
}
