import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRole } from '../models/restaurant.model';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userRole: UserRole | null = null; // On initialise à null

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    // Récupérer le rôle de l'utilisateur connecté
    this.userRole = this.authService.getUserRole();
  }

  // Méthodes pour gérer les actions des boutons
  viewRestaurants() {
    console.log('Affichage des restaurants du restaurateur');
    this.router.navigate(['/Create']);
  }

  addRestaurant() {
    console.log('Ajout d’un restaurant');
  }

  viewAllRestaurants() {
    console.log('Affichage de tous les restaurants');
  }

  otherPage() {
    console.log('Autre page');
  }

  viewUsers() {
    console.log('Affichage des utilisateurs');
  }

  viewRestaurateurs() {
    console.log('Affichage des restaurateurs');
  }

  protected readonly UserRole = UserRole;
}
