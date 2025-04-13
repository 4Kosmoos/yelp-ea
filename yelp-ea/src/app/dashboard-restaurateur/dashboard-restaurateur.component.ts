import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant, RestaurantCategories, User } from '../models/restaurant.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

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
  currentUser: User | null = null;  // Initialisation à null pour éviter les erreurs
  errorMessage: string | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    // Récupération de l'utilisateur connecté via l'observable
    this.authService.getCurrentUserObservable().subscribe({
      next: (user) => {
        this.currentUser = user;
        if (this.currentUser) {
          this.loadRestaurants();  // Charger les restaurants si l'utilisateur est récupéré
        } else {
          console.error("Aucun utilisateur connecté");
          this.isLoading = false;
        }
      },
      error: (err) => {
        console.error("Erreur lors de la récupération de l'utilisateur", err);
        this.isLoading = false;
      }
    });
  }

  loadRestaurants(): void {
    if (!this.currentUser) {
      console.error('Utilisateur non connecté, impossible de charger les restaurants');
      this.isLoading = false;
      this.errorMessage = null;
      return;
    }

    // Appel au service pour récupérer les restaurants du propriétaire connecté
    this.restaurantService.getRestaurantsForOwner(this.currentUser.id).subscribe({
      next: (data) => {
        console.log("Données reçues :", data);
        this.restaurants = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des restaurants", err);
        this.errorMessage = 'Erreur lors du chargement des utilisateurs.';
        this.isLoading = false;
      }
    });
  }

  updateRestaurant(restaurantId: number): void {
    console.log('Modification d’un restaurant');
    this.router.navigate([`/edit/${restaurantId}`]);
  }

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
