import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {User, UserRole} from '../models/restaurant.model';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    FormsModule,
    CommonModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginData = { login: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.loginData.login, this.loginData.password).subscribe(
      (user: User | null) => {
        if (user) {
          this.authService.setCurrentUser(user); // Stocke l'utilisateur connecté
          switch (user.userRole) {
            case UserRole.customer:
              this.router.navigate(['/restaurant']);
              break;
            case UserRole.owner:
              this.router.navigate(['/dashboard-restaurateur']);
              break;
            case UserRole.admin:
              this.router.navigate(['/admin']);
              break;
            default:
              this.errorMessage = 'Rôle inconnu';
          }
        } else {
          this.errorMessage = 'Identifiants incorrects';
        }
      },
      () => {
        this.errorMessage = 'Erreur lors de la connexion';
      }
    );
  }

}
