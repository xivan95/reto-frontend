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
    //   'https://retodam.onrender.com/api/auth/login',
    //   {
    //     email,
    //     password,
    //   }
    // );
    return this.http.post<LoginResponse>(
      'https://retodam.onrender.com/api/auth/login',
      {
        email,
        password,
      }
    );
  }
}
