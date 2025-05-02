import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../models/loginresponse.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    // return this.http.post<LoginResponse>(
    //   'https://retodam-production.up.railway.app/api/auth/login',
    //   {
    //     email,
    //     password,
    //   }
    // );
    return this.http.post<LoginResponse>(
      'http://localhost:8080/api/auth/login',
      {
        email,
        password,
      }
    );
  }
}
