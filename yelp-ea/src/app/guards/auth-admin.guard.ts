import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardAdmin implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getUserRole(); // Récupération du rôle
    // if (role === 'admin') {
    //   return true; // Accès autorisé
    // }
    this.router.navigate(['/login']); // Redirection si ce n'est pas un admin
    return false;
  }
}
