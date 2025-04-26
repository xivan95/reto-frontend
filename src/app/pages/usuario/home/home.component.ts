import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms'; // 🔥 IMPORTANTE
import { Vacante } from '../../../core/models/vacante.model';
import { Solicitud } from '../../../core/models/solicitud.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule, // ✅ Lo añadimos aquí
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
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
      descripcion: 'Desarrollo de aplicaciones modernas en Angular 16+.',
      requisitos:
        'Experiencia en Angular 14+, RxJS, buenas prácticas de desarrollo.',
      estado: 'CREADA',
      tipoContrato: 'Tiempo Completo',
      categoria: 'Programación',
    },
    {
      id: 2,
      titulo: 'Analista de Datos',
      empresa: 'DataCorp',
      ubicacion: 'Barcelona, España',
      descripcion:
        'Análisis de grandes volúmenes de datos y creación de dashboards.',
      requisitos: 'Conocimientos de SQL, Power BI o Tableau.',
      estado: 'CREADA',
      tipoContrato: 'Medio Tiempo',
      categoria: 'Datos',
    },
    {
      id: 3,
      titulo: 'Ingeniero de Software',
      empresa: 'Innovatech',
      ubicacion: 'Valencia, España',
      descripcion:
        'Desarrollo de sistemas de IA y soluciones cloud escalables.',
      requisitos: 'Experiencia en Python, AWS, arquitecturas distribuidas.',
      estado: 'CREADA',
      tipoContrato: 'Freelance',
      categoria: 'Programación',
    },
  ];

  vacantes: Vacante[] = [];

  // Filtros
  filtroEmpresa: string = '';
  filtroTipoContrato: string = '';
  filtroCategoria: string = '';

  constructor() {
    this.filtrarVacantesDisponibles();
  }

  filtrarVacantesDisponibles() {
    const solicitudes: Solicitud[] = JSON.parse(
      localStorage.getItem('misSolicitudes') || '[]'
    );
    const vacantesPostuladas = solicitudes.map((s) => s.vacante);

    let vacantesFiltradas = this.vacantesOriginales.filter(
      (vacante) =>
        !vacantesPostuladas.includes(vacante.titulo) &&
        vacante.estado === 'CREADA'
    );

    if (this.filtroEmpresa.trim()) {
      vacantesFiltradas = vacantesFiltradas.filter((vacante) =>
        vacante.empresa.toLowerCase().includes(this.filtroEmpresa.toLowerCase())
      );
    }

    if (this.filtroTipoContrato) {
      vacantesFiltradas = vacantesFiltradas.filter(
        (vacante) => vacante.tipoContrato === this.filtroTipoContrato
      );
    }

    if (this.filtroCategoria.trim()) {
      vacantesFiltradas = vacantesFiltradas.filter((vacante) =>
        vacante.categoria
          .toLowerCase()
          .includes(this.filtroCategoria.toLowerCase())
      );
    }

    this.vacantes = vacantesFiltradas;
  }

  limpiarFiltros() {
    this.filtroEmpresa = '';
    this.filtroTipoContrato = '';
    this.filtroCategoria = '';
    this.filtrarVacantesDisponibles();
  }
}
