import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  imports: [
    NgIf,
    NgForOf
  ],
  styleUrls: ['./restaurant-detail.component.css']
})
export class RestaurantDetailComponent implements OnInit {
  restaurants: Restaurant[] = [];
  isLoading = true;
  errorMessage: string = '';

  constructor(private restaurantService: RestaurantService) { }

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
        console.error('Erreur lors de la récupération des restaurants', err);
        this.errorMessage = "Erreur de chargement des restaurants.";
        this.isLoading = false;
      }
    });
  }

  deleteRestaurant(restaurant: Restaurant): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce restaurant ?')) {
      this.restaurantService.deleteRestaurant(restaurant.id).subscribe({
        next: () => {
          this.restaurants = this.restaurants.filter(r => r.id !== restaurant.id);
          console.log('Restaurant supprimé avec succès');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du restaurant', err);
          this.errorMessage = "Erreur de suppression du restaurant.";
        }
      });
    }
  }
}
