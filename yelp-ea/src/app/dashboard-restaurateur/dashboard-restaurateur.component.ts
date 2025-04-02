import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';  // Service pour récupérer l'utilisateur connecté

@Component({
  selector: 'app-dashboard-restaurateur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard-restaurateur.component.html',
  styleUrls: ['./dashboard-restaurateur.component.css']
})
export class DashboardRestaurateurComponent implements OnInit {
  restaurants: Restaurant[] = [];
  isLoading = true;
  showForm = false;
  ownerId: number = 0;  // ID du restaurateur

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private authService: AuthService  // Injecte le service d'authentification
  ) {}

  ngOnInit(): void {
    // Récupérer l'ID du restaurateur connecté à partir du service d'authentification
    this.ownerId = this.authService.getCurrentOwnerId(); // Supposons que cette méthode renvoie l'ID du restaurateur connecté
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    // Charger les restaurants du restaurateur connecté
    this.restaurantService.getRestaurantsForOwner(this.ownerId).subscribe({
      next: (data) => {
        this.restaurants = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des restaurants", err);
        this.isLoading = false;
      }
    });
  }

  UpdateRestaurant(restaurantId: number): void {
    console.log('Modification d’un restaurant');
    this.router.navigate([`/edit/${restaurantId}`])
  }

  // Méthode pour supprimer un restaurant
  deleteRestaurant(restaurantId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce restaurant ?')) {
      this.restaurantService.deleteRestaurant(restaurantId).subscribe({
        next: () => {
          this.restaurants = this.restaurants.filter(restaurant => restaurant.id !== restaurantId);
          console.log('Restaurant supprimé avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du restaurant', err);
        }
      });
    }
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}
