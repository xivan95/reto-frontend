import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Vacante } from '../../../core/models/vacante.model';
import { Solicitud } from '../../../core/models/solicitud.model';
import { PostulacionDialogComponent } from '../postulacion-dialog.component';

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
      descripcion: 'Desarrollo de aplicaciones modernas en Angular 16+.',
      requisitos:
        'Experiencia previa en Angular 14+, RxJS y buenas prácticas de desarrollo.',
      ubicacion: 'Madrid, España',
      empresa: 'Tech Solutions',
      estado: 'CREADA',
      tipoContrato: 'Tiempo Completo',
      categoria: 'Programación',
    },
    {
      id: 2,
      titulo: 'Analista de Datos',
      descripcion:
        'Análisis de grandes volúmenes de datos y creación de dashboards.',
      requisitos: 'Conocimientos en SQL, Power BI, Tableau.',
      ubicacion: 'Barcelona, España',
      empresa: 'DataCorp',
      estado: 'CREADA',
      tipoContrato: 'Medio Tiempo',
      categoria: 'Datos',
    },
    {
      id: 3,
      titulo: 'Ingeniero de Software',
      descripcion:
        'Desarrollo de sistemas de IA y soluciones cloud escalables.',
      requisitos: 'Experiencia en Python, AWS y arquitecturas distribuidas.',
      ubicacion: 'Valencia, España',
      empresa: 'Innovatech',
      estado: 'CREADA',
      tipoContrato: 'Freelance',
      categoria: 'Programación',
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

        const nuevasSolicitudes: Solicitud[] = JSON.parse(
          localStorage.getItem('misSolicitudes') || '[]'
        );

        const nuevaSolicitud: Solicitud = {
          id: Date.now(),
          nombre: result.nombre,
          email: result.email,
          vacante: this.vacante.titulo,
          estado: 'Pendiente',
        };

        nuevasSolicitudes.push(nuevaSolicitud);
        localStorage.setItem(
          'misSolicitudes',
          JSON.stringify(nuevasSolicitudes)
        );

        this.snackBar.open('¡Postulación enviada exitosamente!', 'Cerrar', {
          duration: 3000,
        });

        this.router.navigate(['/usuario/home']);
      }
    });
  }
}
