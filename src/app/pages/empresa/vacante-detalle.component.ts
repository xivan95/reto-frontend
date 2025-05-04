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

    this.vacantesService.getVacantePorId(id).subscribe({
      next: (vacante) => {
        this.vacante = vacante;
        this.actualizarSolicitudes();
      },
      error: () => {
        this.snackBar.open('Vacante no encontrada.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  asignarSolicitud(solicitudId: number): void {
    if (!this.vacante) return;

    const dialogRef = this.dialog.open(DialogComentarioComponent, {
      data: { titulo: 'Comentario para adjudicar la solicitud' },
    });

    dialogRef.afterClosed().subscribe((comentario) => {
      if (comentario !== null && comentario.trim() !== '') {
        this.vacantesService
          .asignarVacante(this.vacante!.idVacante, solicitudId, comentario)
          .subscribe(() => {
            this.snackBar.open(
              'Solicitud adjudicada con comentario.',
              'Cerrar',
              {
                duration: 3000,
              }
            );
            this.actualizarSolicitudes();
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
        this.vacantesService
          .cancelarSolicitud(this.vacante!.idVacante, solicitudId, comentario)
          .subscribe(() => {
            this.snackBar.open(
              'Solicitud cancelada con comentario.',
              'Cerrar',
              {
                duration: 3000,
              }
            );
            this.actualizarSolicitudes();
          });
      }
    });
  }

  private actualizarSolicitudes(): void {
    if (!this.vacante) {
      this.solicitudes = [];
      return;
    }

    this.vacantesService.getSolicitudesByVacante(this.vacante.idVacante).subscribe({
      next: (todas: Solicitud[]) => {
        this.solicitudes = todas.sort((a: Solicitud, b: Solicitud) => {
          if (a.estado == 1 && b.estado != 1) return -1;
          if (a.estado != 1 && b.estado == 1) return 1;
          return 0;
        });
      },
      error: () => {
        this.solicitudes = [];
      },
    });
  }
}
