import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacante } from '../models/vacante.model';
import { Solicitud } from '../models/solicitud.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VacantesService {
  //private readonly API_URL = 'https://retodam-production.up.railway.app/api';
  private readonly API_URL = 'https://retodam-production.up.railway.app/api'; // Cambia esto a tu URL de API real

  constructor(private http: HttpClient) {}

  // 📥 Obtener todas las vacantes visibles para usuarios
  getVacantes(): Observable<Vacante[]> {
    return this.http.get<Vacante[]>(`${this.API_URL}/vacantes`);
  }

  // 📥 Obtener una vacante por ID
  getVacantePorId(id: number): Observable<Vacante> {
    return this.http.get<Vacante>(`${this.API_URL}/vacantes/${id}`);
  }

  crearVacante(vacante: Vacante): Observable<Vacante> {
    return this.http.post<Vacante>(`${this.API_URL}/vacantes`, vacante);
  }

  // 🗑️ Eliminar una vacante (o cancelarla si solo se desactiva)
  cancelarVacante(id: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/vacantes/${id}/cancelar`, {});
  }

  // 📝 Actualizar vacante
  actualizarVacante(vacante: Vacante): Observable<Vacante> {
    return this.http.put<Vacante>(
      `${this.API_URL}/vacantes/${vacante.idVacante}`,
      vacante
    );
  }

  // 📥 Obtener solicitudes para una vacante (empresa)
  getSolicitudesByVacante(vacanteId: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(
      `${this.API_URL}/solicitudes/vacante/${vacanteId}`
    );
  }

  // ➕ Enviar una solicitud (usuario)
  enviarSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.API_URL}/solicitudes`, solicitud);
  }

  // ✅ Asignar vacante a solicitud
  asignarVacante(
    vacanteId: number,
    solicitudId: number,
    comentario: string
  ): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/vacantes/${vacanteId}/solicitudes/${solicitudId}/asignar`,
      { comentario }
    );
  }

  getMisVacantes() {
    return this.http.get<Vacante[]>(`${this.API_URL}/vacantes/mis-vacantes`);
  }

  // ❌ Cancelar solicitud de usuario
  cancelarSolicitud(
    vacanteId: number,
    solicitudId: number,
    comentario: string
  ): Observable<void> {
    return this.http.put<void>(
      `${this.API_URL}/solicitudes/${solicitudId}/cancelar`,
      { vacanteId, comentario }
    );
  }
}
