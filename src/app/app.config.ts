import { provideRouter } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';


export const routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' as const },

  // 🔐 Login (sin guard)
  {
    path: 'auth/login',
    loadComponent: () =>
      import('./pages/auth/login.component').then((m) => m.LoginComponent),
  },

  // 👤 Usuario
  {
    path: 'usuario/home',
    loadComponent: () =>
      import('./pages/usuario/home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard, roleGuard('user')],
  },
  {
    path: 'usuario/mis-solicitudes',
    loadComponent: () =>
      import('./pages/usuario/mis-solicitudes/mis-solicitudes.component').then(
        (m) => m.MisSolicitudesComponent
      ),
    canActivate: [authGuard, roleGuard('user')],
  },

  // 🏢 Empresa
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
      import('./pages/empresa/publicar-vacante/publicar-vacante.component').then(
        (m) => m.PublicarVacanteComponent
      ),
    canActivate: [authGuard, roleGuard('empresa')],
  },
  {
    path: 'empresa/solicitudes-recibidas',
    loadComponent: () =>
      import('./pages/empresa/solicitudes-recibidas/solicitudes-recibidas.component').then(
        (m) => m.SolicitudesRecibidasComponent
      ),
    canActivate: [authGuard, roleGuard('empresa')],
  },

  // 👮 Admin
  {
    path: 'admin/gestionar-usuarios',
    loadComponent: () =>
      import('./pages/admin/gestionar-usuarios/gestionar-usuarios.component').then(
        (m) => m.GestionarUsuariosComponent
      ),
    canActivate: [authGuard, roleGuard('admin')],
  },
  {
    path: 'admin/gestionar-empresas',
    loadComponent: () =>
      import('./pages/admin/gestionar-empresas/gestionar-empresas.component').then(
        (m) => m.GestionarEmpresasComponent
      ),
    canActivate: [authGuard, roleGuard('admin')],
  },
  {
    path: 'admin/gestionar-categorias',
    loadComponent: () =>
      import('./pages/admin/gestionar-categorias/gestionar-categorias.component').then(
        (m) => m.GestionarCategoriasComponent
      ),
    canActivate: [authGuard, roleGuard('admin')],
  },
];

export const appConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    { provide: HTTP_INTERCEPTORS, useValue: authInterceptor, multi: true },
  ],
};
