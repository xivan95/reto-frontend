import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Solicitud } from '../../../core/models/solicitud.model';

@Component({
  selector: 'app-solicitudes-recibidas',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
  ],
  templateUrl: './solicitudes-recibidas.component.html',
  styleUrls: ['./solicitudes-recibidas.component.scss'],
})
export class SolicitudesRecibidasComponent {
  solicitudes: Solicitud[] = [
    {
      id: 1,
      nombre: 'Carlos García',
      email: 'carlos@example.com',
      vacante: 'Desarrollador Angular',
      estado: 'Pendiente',
    },
    {
      id: 2,
      nombre: 'Laura Fernández',
      email: 'laura@example.com',
      vacante: 'Diseñador UX/UI',
      estado: 'Pendiente',
    },
    {
      id: 3,
      nombre: 'Miguel Ruiz',
      email: 'miguel@example.com',
      vacante: 'Desarrollador Angular',
      estado: 'Pendiente',
    },
  ];

  constructor(private snackBar: MatSnackBar) {}

  cambiarEstado(
    solicitudId: number,
    nuevoEstado: 'Pendiente' | 'Adjudicada' | 'Rechazada'
  ) {
    const solicitud = this.solicitudes.find((s) => s.id === solicitudId);
    if (solicitud) {
      solicitud.estado = nuevoEstado;
      this.solicitudes = [...this.solicitudes]; // refrescar la tabla
      this.snackBar.open(`Estado cambiado a ${nuevoEstado}`, 'Cerrar', {
        duration: 3000,
      });
    }
  }
}
