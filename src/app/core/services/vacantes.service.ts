import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VacantesService {
  private vacantes: any[] = [
    {
      id: 1,
      titulo: 'Desarrollador Angular',
      ubicacion: 'Madrid',
      categoria: 'Programación',
      descripcion: '...',
    },
    {
      id: 2,
      titulo: 'Diseñador UX/UI',
      ubicacion: 'Barcelona',
      categoria: 'Diseño',
      descripcion: '...',
    },
  ];

  getVacantes() {
    return this.vacantes;
  }

  agregarVacante(vacante: any) {
    this.vacantes.push({ ...vacante, id: Date.now() }); // id único
  }

  eliminarVacante(id: number) {
    this.vacantes = this.vacantes.filter((v) => v.id !== id);
  }
}
