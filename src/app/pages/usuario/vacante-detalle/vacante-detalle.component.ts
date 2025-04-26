import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { Vacante } from '../../../core/models/vacante.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PostulacionDialogComponent } from '../postulacion-dialog.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-vacante-detalle',
  standalone: true,
  imports: [CommonModule, RouterModule, MatCardModule, MatButtonModule],
  templateUrl: './vacante-detalle.component.html',
  styleUrls: ['./vacante-detalle.component.scss'],
})
export class VacanteDetalleComponent {
  vacante: Vacante | undefined;

  vacantes: Vacante[] = [
    {
      id: 1,
      titulo: 'Desarrollador Frontend Angular',
      empresa: 'Tech Solutions',
      ubicacion: 'Madrid, España',
      descripcion:
        'Desarrollo de interfaces modernas en Angular 16+, colaboración con equipos de backend y UX/UI.',
    },
    {
      id: 2,
      titulo: 'Analista de Datos',
      empresa: 'DataCorp',
      ubicacion: 'Barcelona, España',
      descripcion:
        'Análisis de grandes volúmenes de datos, creación de dashboards y generación de reportes estratégicos.',
    },
    {
      id: 3,
      titulo: 'Ingeniero de Software',
      empresa: 'Innovatech',
      ubicacion: 'Valencia, España',
      descripcion:
        'Participación en proyectos innovadores de inteligencia artificial y machine learning, desarrollo de soluciones escalables.',
    },
  ];

  constructor(
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.vacante = this.vacantes.find((v) => v.id === id);
  }

  openPostulacionDialog() {
    const dialogRef = this.dialog.open(PostulacionDialogComponent, {
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && this.vacante) {
        console.log('Postulación:', result);

        // 🔥 Guardar ID de vacante en localStorage
        const postulaciones = JSON.parse(
          localStorage.getItem('postulaciones') || '[]'
        );
        postulaciones.push(this.vacante.id);
        localStorage.setItem('postulaciones', JSON.stringify(postulaciones));

        this.snackBar.open('¡Postulación enviada exitosamente!', 'Cerrar', {
          duration: 3000,
        });

        this.router.navigate(['/usuario/home']);
      }
    });
  }
}
