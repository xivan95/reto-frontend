import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { VacantesService } from '../../../core/services/vacantes.service';
import { Vacante } from '../../../core/models/vacante.model';

@Component({
  selector: 'app-vacantes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.scss'],
})
export class VacantesComponent implements OnInit {
  vacantes: Vacante[] = [];

  constructor(
    private vacantesService: VacantesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.cargarVacantes();
  }

  cargarVacantes() {
    this.vacantes = this.vacantesService
      .getVacantes()
      .filter((v) => v.estado !== 'CANCELADA');
  }

  cancelarVacante(id: number) {
    this.vacantesService.cancelarVacante(id);
    this.cargarVacantes(); // 🔥 Recargamos vacantes filtradas
    this.snackBar.open('Vacante cancelada correctamente.', 'Cerrar', {
      duration: 3000,
    });
  }
}
