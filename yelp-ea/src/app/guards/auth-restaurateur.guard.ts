import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardRestaurateur implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getUserRole(); // Récupération du rôle utilisateur
    if (role === 'restaurateur') {
      return true; // Accès autorisé
    }
    this.router.navigate(['/login']); // Redirection si ce n'est pas un restaurateur
    return false;
  }
}
