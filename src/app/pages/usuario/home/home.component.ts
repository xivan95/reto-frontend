import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Vacante } from '../../../core/models/vacante.model'; // o la ruta que tengas

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  vacantesOriginales: Vacante[] = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend Angular',
      empresa: 'Tech Solutions',
      ubicacion: 'Madrid, España',
      descripcion: 'Desarrollo de aplicaciones modernas en Angular 16+',
    },
    {
      id: 2,
      titulo: 'Analista de Datos',
      empresa: 'DataCorp',
      ubicacion: 'Barcelona, España',
      descripcion:
        'Análisis de grandes volúmenes de datos y generación de dashboards',
    },
    {
      id: 3,
      titulo: 'Ingeniero de Software',
      empresa: 'Innovatech',
      ubicacion: 'Valencia, España',
      descripcion: 'Desarrollo de sistemas de IA y soluciones cloud escalables',
    },
  ];

  vacantes: Vacante[] = [];

  constructor() {
    this.filtrarVacantesDisponibles();
  }

  filtrarVacantesDisponibles() {
    const postulaciones: number[] = JSON.parse(
      localStorage.getItem('postulaciones') || '[]'
    );
    this.vacantes = this.vacantesOriginales.filter(
      (vacante) => !postulaciones.includes(vacante.id)
    );
  }
}
