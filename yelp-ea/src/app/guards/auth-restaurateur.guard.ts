import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {UserRole} from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardRestaurateur implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const role = this.authService.getUserRole(); // Récupération du rôle utilisateur
    if (role === UserRole.owner) {
      console.log("le role est" + role);
      return true;
      this.router.navigate(['/dashboard-restaurateur']);
    }
    this.router.navigate(['/login']); // Redirection si ce n'est pas un restaurateur
    return false;
  }
}
