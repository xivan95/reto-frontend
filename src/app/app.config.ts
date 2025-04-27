import { provideRouter } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' as const },

  {
    path: 'auth/login',
    loadComponent: () =>
      import('./pages/auth/login.component').then((m) => m.LoginComponent),
  },

  {
    path: 'empresa/vacantes',
    loadComponent: () =>
      import('./pages/empresa/vacantes/vacantes.component').then(
        (m) => m.VacantesComponent
      ),
    canActivate: [authGuard, roleGuard('empresa')],
  },
  {
    path: 'empresa/publicar-vacante',
    loadComponent: () =>
      import(
        './pages/empresa/publicar-vacante/publicar-vacante.component'
      ).then((m) => m.PublicarVacanteComponent),
    canActivate: [authGuard, roleGuard('empresa')],
  },

  {
    path: 'admin/gestionar-usuarios',
    loadComponent: () =>
      import('./pages/admin/home-admin/home-admin.component').then(
        (m) => m.HomeAdminComponent
      ),
    canActivate: [authGuard, roleGuard('admin')],
  },
  {
    path: 'admin/gestionar-empresas',
    loadComponent: () =>
      import(
        './pages/admin/gestionar-empresas/gestionar-empresas.component'
      ).then((m) => m.GestionarEmpresasComponent),
    canActivate: [authGuard, roleGuard('admin')],
  },
  {
    path: 'admin/gestionar-categorias',
    loadComponent: () =>
      import(
        './pages/admin/gestionar-categorias/gestionar-categorias.component'
      ).then((m) => m.GestionarCategoriasComponent),
    canActivate: [authGuard, roleGuard('admin')],
  },
  {
    path: 'empresa/vacante/:id',
    loadComponent: () =>
      import('./pages/empresa/vacante-detalle.component').then(
        (m) => m.VacanteDetalleComponent
      ),
    canActivate: [authGuard, roleGuard('empresa')],
  },
  {
    path: 'empresa/editar-vacante/:id',
    loadComponent: () =>
      import('./shared/vacante-editar/vacante-editar.component').then(
        (m) => m.VacanteEditarComponent
      ),
    canActivate: [authGuard, roleGuard('empresa')],
  },
];

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true },
  ],
};
