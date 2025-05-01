import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { VacantesService } from '../../../core/services/vacantes.service';
import { Vacante } from '../../../core/models/vacante.model';
import { DialogConfirmacionComponent } from '../../../shared/dialog-confirmacion/dialog-confirmacion.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-vacantes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
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

  ngOnInit() {
    this.cargarVacantes();
  }

  cargarVacantes() {
    this.vacantes = this.vacantesService
      .getVacantes()
      .filter((v) => v.estado !== 'CANCELADA');
  }

  cancelarVacante(id: number): void {
    const dialogRef = this.dialog.open(DialogConfirmacionComponent, {
      data: { mensaje: '¿Estás seguro que quieres cancelar esta vacante?' },
    });

    dialogRef.afterClosed().subscribe((confirmado) => {
      if (confirmado) {
        this.vacantesService.cancelarVacante(id);
        this.cargarVacantes();
        this.snackBar.open('Vacante cancelada correctamente.', 'Cerrar', {
          duration: 3000,
        });
      }
    });
  }
}
