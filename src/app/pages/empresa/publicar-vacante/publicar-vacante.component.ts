// src/app/pages/empresa/publicar-vacante/publicar-vacante.component.ts
import { Component } from '@angular/core';
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
import { VacantesService } from '../../../core/services/vacantes.service';

@Component({
  selector: 'app-publicar-vacante',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './publicar-vacante.component.html',
  styleUrls: ['./publicar-vacante.component.scss'],
})
export class PublicarVacanteComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private router: Router,
    private vacantesService: VacantesService
  ) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      ubicacion: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  publicar() {
    if (this.form.invalid) {
      this.snackBar.open('Por favor, completa todos los campos.', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    const nuevaVacante = this.form.value;
    this.vacantesService.agregarVacante(nuevaVacante);

    this.snackBar.open('Vacante publicada exitosamente.', 'Cerrar', {
      duration: 3000,
    });

    this.router.navigate(['/empresa/vacantes']);
  }
}
