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
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';

import { VacantesService } from '../../../core/services/vacantes.service';
import { CategoriasService } from '../../../core/services/categorias.service';
import { Categoria } from '../../../core/models/categoria.model';
import { Vacante } from '../../../core/models/vacante.model';

@Component({
  selector: 'app-publicar-vacante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './publicar-vacante.component.html',
  styleUrls: ['./publicar-vacante.component.scss'],
})
export class PublicarVacanteComponent implements OnInit {
  form: FormGroup;
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private vacantesService: VacantesService,
    private categoriaService: CategoriasService
  ) {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      detalles: ['', Validators.required],
      salario: [null, Validators.required],
      estatus: ['Abierta', Validators.required],
      categoria: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.categoriaService.getAll().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: () => {
        this.snackBar.open('Error al cargar categorías.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  publicar(): void {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const nuevaVacante: Vacante = this.form.value;

    this.vacantesService.crearVacante(nuevaVacante).subscribe({
      next: () => {
        this.snackBar.open('Vacante publicada exitosamente.', 'Cerrar', {
          duration: 3000,
        });
        this.router.navigate(['/empresa/vacantes']);
      },
      error: () => {
        this.snackBar.open('Error al publicar vacante.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  volver(): void {
    this.router.navigate(['/empresa/vacantes']);
  }
}
