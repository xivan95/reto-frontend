import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Empresa {
  idEmpresa: number;
  razonSocial: string;
  direccionFiscal: string;
  pais: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmpresasService {
  //private readonly API_URL = 'https://retodam-production.up.railway.app/api/empresas';
  private readonly API_URL = 'http://localhost:8080/api/empresas'; // Cambia esto a tu URL de API real

  constructor(private http: HttpClient) {}

  getAll(): Observable<Empresa[]> {
    return this.http.get<Empresa[]>(this.API_URL);
  }

  create(empresa: Empresa): Observable<Empresa> {
    const { idEmpresa, ...empresaSinId } = empresa; 
    return this.http.post<Empresa>(this.API_URL, empresaSinId);
  }

  update(empresa: Empresa): Observable<Empresa> {
    return this.http.put<Empresa>(
      `${this.API_URL}/${empresa.idEmpresa}`,
      empresa
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}