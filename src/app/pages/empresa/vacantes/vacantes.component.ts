import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VacantesService } from '../../../core/services/vacantes.service';
import { Vacante } from '../../../core/models/vacante.model';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogConfirmacionComponent } from '../../../shared/dialog-confirmacion/dialog-confirmacion.component';

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
    MatDialogModule,
  ],
  templateUrl: './vacantes.component.html',
  styleUrls: ['./vacantes.component.scss'],
})
export class VacantesComponent implements OnInit {
  vacantes: Vacante[] = [];

  constructor(
    private vacantesService: VacantesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.vacantesService.getMisVacantes().subscribe({
      next: (vacantes) => (this.vacantes = vacantes),
      error: () => {
        this.snackBar.open('Error al cargar tus vacantes.', 'Cerrar', {
          duration: 3000,
        });
      },
    });
  }

  cancelarVacante(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: { mensaje: '¿Estás seguro de cancelar esta vacante?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.vacantesService.cancelarVacante(id).subscribe(() => {
          this.vacantes = this.vacantes.filter((v) => v.idVacante !== id);
          this.snackBar.open('Vacante cancelada.', 'Cerrar', {
            duration: 3000,
          });
        });
      }
    });
  }
}
