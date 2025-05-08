import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Vacante } from '../models/vacante.model';
import { Solicitud } from '../models/solicitud.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VacantesService {
  private readonly API_URL = 'https://retodam-production.up.railway.app/api';

  constructor(private http: HttpClient) {}

  getVacantes(): Observable<Vacante[]> {
    return this.http.get<Vacante[]>(`${this.API_URL}/vacantes`);
  }

  getVacantePorId(id: number): Observable<Vacante> {
    return this.http.get<Vacante>(`${this.API_URL}/vacantes/${id}`);
  }

  crearVacante(vacante: Vacante): Observable<Vacante> {
    return this.http.post<Vacante>(`${this.API_URL}/vacantes`, vacante);
  }

  cancelarVacante(id: number): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/vacantes/${id}/cancelar`, {});
  }

  actualizarVacante(vacante: Vacante): Observable<Vacante> {
    return this.http.put<Vacante>(
      `${this.API_URL}/vacantes/${vacante.idVacante}`,
      vacante
    );
  }

  getSolicitudesByVacante(vacanteId: number): Observable<Solicitud[]> {
    return this.http.get<Solicitud[]>(
      `${this.API_URL}/solicitudes/vacante/${vacanteId}`
    );
  }

  enviarSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    return this.http.post<Solicitud>(`${this.API_URL}/solicitudes`, solicitud);
  }

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
