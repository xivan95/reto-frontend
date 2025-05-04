// auth-interceptor.ts
import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent,
  HttpErrorResponse,
  HttpClient,
} from '@angular/common/http';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const http = inject(HttpClient);
  const router = inject(Router);

  const token = authService.getToken();

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        const refreshToken = authService.getRefreshToken();

        if (!refreshToken) {
          authService.logout();
          router.navigate(['/auth/login']);
          return throwError(() => error);
        }

        return http
          .post<any>(
            'https://retodam-production.up.railway.app/api/auth/refresh-token',
            {
              refreshToken,
            }
          )
          .pipe(
            switchMap((res) => {
              authService.saveLoginData(res);
              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.accessToken}`,
                },
              });
              return next(newRequest);
            }),
            catchError(() => {
              authService.logout();
              router.navigate(['/auth/login']);
              return throwError(() => error);
            })
          );
      }

      return throwError(() => error);
    })
  );
};
