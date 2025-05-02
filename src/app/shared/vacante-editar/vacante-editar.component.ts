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

@Component({
  selector: 'app-vacante-editar',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './vacante-editar.component.html',
  styleUrls: ['./vacante-editar.component.scss'],
})
export class VacanteEditarComponent implements OnInit {
  form: FormGroup;
  vacanteId: number | undefined;
  vacante: Vacante | undefined;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private vacantesService: VacantesService
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      ubicacion: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
      requisitos: ['', Validators.required],
      tipoContrato: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.vacanteId = Number(this.route.snapshot.paramMap.get('id'));
    this.vacantesService.getVacantePorId(this.vacanteId).subscribe({
      next: (vacante) => {
        this.vacante = vacante;
        this.form.patchValue({
          titulo: vacante.titulo,
          ubicacion: vacante.ubicacion,
          categoria: vacante.categoria,
          descripcion: vacante.descripcion,
          requisitos: vacante.requisitos,
          tipoContrato: vacante.tipoContrato,
        });
      },
      error: () => {
        this.snackBar.open('Vacante no encontrada.', 'Cerrar', { duration: 3000 });
        this.router.navigate(['/empresa/vacante', this.vacanteId]);
      },
    });

  }

  guardarCambios() {
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

    this.snackBar.open('Vacante actualizada correctamente.', 'Cerrar', {
      duration: 3000,
    });

    this.router.navigate(['/empresa/vacante', this.vacanteId]);
  }

  volver() {
    this.router.navigate(['/empresa/vacante', this.vacanteId]);
  }
}
