import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant.model';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  constructor(private restaurantService: RestaurantService, private router: Router) {}

  ngOnInit(): void {
    this.loadRestaurants();
  }

  loadRestaurants(): void {
    this.restaurantService.getRestaurants().subscribe({
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

  addRestaurant(): void {
    console.log('Ajout d’un restaurant');
    this.router.navigate(['/ajout']); // Redirection vers la page d'ajout
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
