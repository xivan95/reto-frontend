import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../models/categoria.model';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  //private readonly API_URL = 'https://retodam-production.up.railway.app/api/categorias';
  private readonly API_URL = 'http://localhost:8080/api/categorias'; // Cambia esto a tu URL de API real

  constructor(private http: HttpClient) {}

  getAll(): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(this.API_URL);
  }

  create(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.API_URL, categoria);
  }

  update(categoria: Categoria): Observable<Categoria> {
    return this.http.put<Categoria>(
      `${this.API_URL}/${categoria.idCategoria}`,
      categoria
    );
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${id}`);
  }
}
