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
      descripcion: 'Desarrollar aplicaciones en Angular 16+.',
      requisitos: 'Experiencia en Angular, RxJS.',
      empresa: 'Tech Solutions',
      tipoContrato: 'Tiempo Completo',
      estado: 'CREADA',
    },
    {
      id: 2,
      titulo: 'Diseñador UX/UI',
      ubicacion: 'Barcelona',
      categoria: 'Diseño',
      descripcion: 'Diseño de interfaces amigables.',
      requisitos: 'Experiencia en Figma, Sketch.',
      empresa: 'DataCorp',
      tipoContrato: 'Tiempo Completo',
      estado: 'CREADA',
    },
  ];

  private solicitudes: Solicitud[] = [];

  constructor() {
    this.simularSolicitudes(); // ⚡ Iniciar solicitudes de prueba
  }

  getVacantes(): Vacante[] {
    return this.vacantes;
  }

  getVacantePorId(id: number): Vacante | undefined {
    return this.vacantes.find((v) => v.id === id);
  }

  agregarVacante(vacante: Vacante) {
    this.vacantes.push({ ...vacante, id: Date.now(), estado: 'CREADA' });
  }

  eliminarVacante(id: number) {
    this.vacantes = this.vacantes.filter((v) => v.id !== id);
  }

  cancelarVacante(id: number) {
    const vacante = this.vacantes.find((v) => v.id === id);
    if (vacante) {
      vacante.estado = 'CANCELADA';
    }
  }

  actualizarVacante(vacanteActualizada: Vacante) {
    const index = this.vacantes.findIndex(
      (v) => v.id === vacanteActualizada.id
    );
    if (index !== -1) {
      this.vacantes[index] = { ...vacanteActualizada };
    }
  }

  getSolicitudes(): Solicitud[] {
    return this.solicitudes;
  }

  getSolicitudesByVacante(vacanteId: number): Solicitud[] {
    return this.solicitudes.filter((s) => s.vacanteId === vacanteId);
  }

  agregarSolicitud(solicitud: Solicitud) {
    this.solicitudes.push({ ...solicitud });
  }

  asignarVacante(vacanteId: number, solicitudId: number) {
    const solicitud = this.solicitudes.find(
      (s) => s.id === solicitudId && s.vacanteId === vacanteId
    );
    const vacante = this.vacantes.find((v) => v.id === vacanteId);

    if (solicitud && vacante) {
      vacante.estado = 'ASIGNADA';
      solicitud.estado = 'adjudicada';
    }
  }

  cancelarSolicitud(vacanteId: number, solicitudId: number) {
    const solicitud = this.solicitudes.find(
      (s) => s.id === solicitudId && s.vacanteId === vacanteId
    );
    if (solicitud) {
      solicitud.estado = 'cancelada';
    }
  }

  // 🔥 Simular solicitudes de ejemplo
  private simularSolicitudes() {
    this.solicitudes = [
      {
        id: 101,
        nombre: 'Carlos García',
        email: 'carlos@example.com',
        estado: 'pendiente',
        vacanteId: 1, // Asociada a la vacante de Desarrollador Angular
      },
      {
        id: 102,
        nombre: 'Laura Fernández',
        email: 'laura@example.com',
        estado: 'pendiente',
        vacanteId: 1, // También asociada a la misma vacante
      },
      {
        id: 103,
        nombre: 'Miguel Ruiz',
        email: 'miguel@example.com',
        estado: 'pendiente',
        vacanteId: 2, // Esta solicitud va a la vacante de Diseñador UX/UI
      },
    ];
  }
}
