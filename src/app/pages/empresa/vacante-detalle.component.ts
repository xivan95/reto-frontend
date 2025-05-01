import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { VacantesService } from '../../core/services/vacantes.service';
import { Vacante } from '../../core/models/vacante.model';
import { Solicitud } from '../../core/models/solicitud.model';
import { DialogComentarioComponent } from '../../shared/dialog-comentario/dialog-comentario.component';

@Component({
  selector: 'app-vacante-detalle',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
  ],
  templateUrl: './vacante-detalle.component.html',
  styleUrls: ['./vacante-detalle.component.scss'],
})
export class VacanteDetalleComponent implements OnInit {
  vacante: Vacante | undefined;
  solicitudes: Solicitud[] = [];

  constructor(
    private route: ActivatedRoute,
    private vacantesService: VacantesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vacante = this.vacantesService.getVacantePorId(id);
    this.actualizarSolicitudes();
  }

  asignarSolicitud(solicitudId: number): void {
    if (!this.vacante) return;

    const dialogRef = this.dialog.open(DialogComentarioComponent, {
      data: { titulo: 'Comentario para adjudicar la solicitud' },
    });

    dialogRef.afterClosed().subscribe((comentario) => {
      if (comentario !== null && comentario.trim() !== '') {
        this.vacantesService.asignarVacante(
          this.vacante!.id,
          solicitudId,
          comentario
        );
        this.actualizarSolicitudes();

        this.snackBar.open('Solicitud adjudicada con comentario.', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  cancelarSolicitud(solicitudId: number): void {
    if (!this.vacante) return;

    const dialogRef = this.dialog.open(DialogComentarioComponent, {
      data: { titulo: 'Comentario para cancelar la solicitud' },
    });

    dialogRef.afterClosed().subscribe((comentario) => {
      if (comentario !== null && comentario.trim() !== '') {
        this.vacantesService.cancelarSolicitud(
          this.vacante!.id,
          solicitudId,
          comentario
        );
        this.actualizarSolicitudes();

        this.snackBar.open('Solicitud cancelada con comentario.', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }

  private actualizarSolicitudes(): void {
    if (!this.vacante) {
      this.solicitudes = [];
      return;
    }

    const todas = this.vacantesService.getSolicitudesByVacante(this.vacante.id);

    this.solicitudes = todas.sort((a, b) => {
      if (a.estado === 'pendiente' && b.estado !== 'pendiente') return -1;
      if (a.estado !== 'pendiente' && b.estado === 'pendiente') return 1;
      return 0;
    });
  }
}
