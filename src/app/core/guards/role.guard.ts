import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: (expectedRole: 'empresa' | 'admin') => CanActivateFn =
  (expectedRole) => () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const role = authService.getRole();

    if (role !== expectedRole) {
      router.navigate(['/auth/login']);
      return false;
    }

    return true;
  };
