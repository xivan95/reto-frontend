import { Injectable } from '@angular/core';
import { Vacante } from '../models/vacante.model';
import { Solicitud } from '../models/solicitud.model';

@Injectable({
  providedIn: 'root',
})
export class VacantesService {
  private vacantes: Vacante[] = [
    {
      id: 1,
      titulo: 'Desarrollador Angular',
      ubicacion: 'Madrid',
      categoria: 'Programación',
      descripcion: 'Desarrollo de aplicaciones Angular 14+',
      requisitos: '2 años de experiencia',
      empresa: 'EmpresaTech',
      tipoContrato: 'Tiempo Completo',
      estado: 'CREADA',
    },
  ];

  private solicitudes: Solicitud[] = [];

  getVacantes() {
    return this.vacantes;
  }

  agregarVacante(vacante: Vacante) {
    this.vacantes.push({ ...vacante, id: Date.now(), estado: 'CREADA' });
  }

  eliminarVacante(id: number) {
    this.vacantes = this.vacantes.filter((v) => v.id !== id);
  }

  getVacantePorId(id: number): Vacante | undefined {
    return this.vacantes.find((v) => v.id === id);
  }

  getSolicitudesByVacante(vacanteId: number): Solicitud[] {
    return this.solicitudes.filter((s) => s.vacanteId === vacanteId);
  }

  asignarVacante(vacanteId: number, solicitudId: number) {
    const vacante = this.getVacantePorId(vacanteId);
    const solicitud = this.solicitudes.find((s) => s.id === solicitudId);

    if (vacante && solicitud) {
      vacante.estado = 'ASIGNADA';
      solicitud.estado = "adjudicada"; // adjudicada
    }
  }

  cancelarSolicitud(solicitudId: number) {
    const solicitud = this.solicitudes.find((s) => s.id === solicitudId);
    if (solicitud) {
      solicitud.estado = "cancelada"; // 2 = cancelada
    }
  }

  cancelarVacante(vacanteId: number) {
    const vacante = this.getVacantePorId(vacanteId);
    if (vacante) {
      vacante.estado = 'CANCELADA';
    }
  }
}
