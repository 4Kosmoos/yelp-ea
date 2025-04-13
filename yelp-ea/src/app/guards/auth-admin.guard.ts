import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {UserRole} from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardAdmin implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getUserRole(); // Récupération du rôle
    if (role === UserRole.admin) {
      console.log("le role est" + role);
      return true;
      this.router.navigate(['/admin']); // Redirection si c'est un admin
    }
    this.router.navigate(['/login']); // Redirection si ce n'est pas un admin
    return false;
  }
}
