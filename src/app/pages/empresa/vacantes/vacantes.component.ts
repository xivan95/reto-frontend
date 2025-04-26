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
  // 🛠️ implements OnInit
  vacantes: Vacante[] = [];

  constructor(
    private vacantesService: VacantesService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // ✅ Ahora sí se ejecuta
    this.vacantes = this.vacantesService.getVacantes();
  }

  eliminarVacante(id: number) {
    this.vacantesService.eliminarVacante(id);
    this.vacantes = this.vacantesService.getVacantes();
    this.snackBar.open('Vacante eliminada correctamente.', 'Cerrar', {
      duration: 3000,
    });
  }
}
