import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant, RestaurantCategories } from '../models/restaurant.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { last } from 'rxjs';

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
  ownerId: number = 0;

  constructor(
    private restaurantService: RestaurantService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.ownerId = this.authService.getCurrentOwnerId();
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurantsForOwner(this.ownerId).subscribe({
      next: (data) => {
        console.log("Données reçues avant transformation :", JSON.stringify(data, null, 2)); // Debug

        this.restaurants = data.map(restaurant => ({
          ...restaurant,
          category: restaurant.categories.map(cat =>
            RestaurantCategories[cat as keyof typeof RestaurantCategories] || cat
          )
        }));

        console.log("Données après transformation :", JSON.stringify(this.restaurants, null, 2)); // Debug
        this.isLoading = false;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des restaurants", err);
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

  protected readonly last = last;
}
