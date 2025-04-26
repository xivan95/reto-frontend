import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { VacantesService } from '../../core/services/vacantes.service';
import { Vacante } from '../../core/models/vacante.model';
import { Solicitud } from '../../core/models/solicitud.model';

@Component({
  selector: 'app-vacante-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatIconModule,
  ],
  templateUrl: './vacante-detalle.component.html',
  styleUrls: ['./vacante-detalle.component.scss'],
})
export class VacanteDetalleComponent {
  vacante: Vacante | undefined;
  solicitudes: Solicitud[] = [];

  constructor(
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private vacantesService: VacantesService
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vacante = this.vacantesService.getVacantePorId(id);

    if (this.vacante) {
      this.solicitudes = this.vacantesService.getSolicitudesByVacante(
        this.vacante.id
      );
    }
  }

  asignarVacante(solicitudId: number) {
    if (this.vacante) {
      this.vacantesService.asignarVacante(this.vacante.id, solicitudId);
      this.solicitudes = this.vacantesService.getSolicitudesByVacante(
        this.vacante.id
      );
      this.snackBar.open('Vacante asignada correctamente.', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  cancelarSolicitud(solicitudId: number) {
    this.vacantesService.cancelarSolicitud(solicitudId);
    this.solicitudes = this.vacantesService.getSolicitudesByVacante(
      this.vacante!.id
    );

    this.snackBar.open('Solicitud cancelada.', 'Cerrar', {
      duration: 3000,
    });
  }
}
