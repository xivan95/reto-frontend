import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: (
  expectedRole: 'user' | 'empresa' | 'admin'
) => CanActivateFn = (expectedRole) => () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const currentRole = authService.getRole();

  if (currentRole !== expectedRole) {
    router.navigate(['/auth/login']);
    return false;
  }

  return true;
};
