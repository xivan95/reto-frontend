import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
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
    },
    {
      id: 2,
      nombre: 'Laura Fernández',
      email: 'laura@example.com',
      vacante: 'Diseñador UX/UI',
    },
    {
      id: 3,
      nombre: 'Miguel Ruiz',
      email: 'miguel@example.com',
      vacante: 'Desarrollador Angular',
    },
  ];

  constructor(private snackBar: MatSnackBar) {}
}
