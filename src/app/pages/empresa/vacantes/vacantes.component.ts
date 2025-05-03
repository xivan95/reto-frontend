import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VacantesService } from '../../../core/services/vacantes.service';
import { Vacante } from '../../../core/models/vacante.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-vacantes',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
  ],
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.scss'],
})
export class VacantesComponent implements OnInit {
  vacantes: Vacante[] = [];

  constructor(private vacantesService: VacantesService) {}

  ngOnInit(): void {
    this.vacantesService.getVacantes().subscribe((vacantes) => {
      this.vacantes = vacantes;
    });
  }

  cancelarVacante(id: number): void {
    this.vacantesService.cancelarVacante(id).subscribe(() => {
      this.vacantes = this.vacantes.filter((v) => v.id !== id);
    });
  }
}
