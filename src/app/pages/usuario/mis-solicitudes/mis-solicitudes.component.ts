import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { Solicitud } from '../../../core/models/solicitud.model';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mis-solicitudes',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatCardModule, MatButtonModule],
  templateUrl: './mis-solicitudes.component.html',
  styleUrls: ['./mis-solicitudes.component.scss'],
})
export class MisSolicitudesComponent {
  solicitudes: Solicitud[] = [];

  constructor(private snackBar: MatSnackBar) {
    this.cargarSolicitudes();
  }

  cargarSolicitudes() {
    const stored = localStorage.getItem('misSolicitudes');
    if (stored) {
      this.solicitudes = JSON.parse(stored);
    } else {
      this.solicitudes = [];
    }
  }

  cancelarPostulacion(solicitudId: number) {
    this.solicitudes = this.solicitudes.filter((s) => s.id !== solicitudId);
    localStorage.setItem('misSolicitudes', JSON.stringify(this.solicitudes));
    this.snackBar.open('Postulación cancelada.', 'Cerrar', { duration: 3000 });
  }
}
