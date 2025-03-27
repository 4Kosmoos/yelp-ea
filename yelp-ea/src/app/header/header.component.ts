import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRole } from '../models/restaurant.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userRole: UserRole | null = null;
  private userRoleSubscription?: Subscription;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // S'abonner à l'utilisateur actuel pour mettre à jour le rôle
    this.userRoleSubscription = this.authService.getCurrentUserObservable().subscribe(user => {
      this.userRole = user?.userRole ?? null;
    });
  }

  ngOnDestroy(): void {
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
  }

  // Méthodes pour gérer les actions des boutons
  viewRestaurants() {
    console.log('Affichage des restaurants du restaurateur');
    this.router.navigate(['/dashboard-restaurateur']);
  }

  addRestaurant(): void {
    console.log('Ajout d’un restaurant');
    this.router.navigate(['/ajout']);
  }

  viewAllRestaurants() {
    console.log('Affichage de tous les restaurants');
    this.router.navigate(['/restaurant']);
  }

  ListeRestoNotePage() {
    console.log('Autre page');
    this.router.navigate(['/ListeRestaurantNote']);
  }

  viewUsers() {
    console.log('Affichage des utilisateurs');
  }

  viewRestaurateurs() {
    console.log('Affichage des restaurateurs');
  }

  // Méthode pour gérer la déconnexion
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  protected readonly UserRole = UserRole;
}
