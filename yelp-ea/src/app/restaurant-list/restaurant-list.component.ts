import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant.model';
import {NgClass} from '@angular/common';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  imports: [
    NgClass,
    CommonModule
  ],
  styleUrls: ['./restaurant-list.component.css']
})
export class RestaurantListComponent implements OnInit {
  restaurants: Restaurant[] = [];
  isLoading = true;

  selectedRestaurant: Restaurant | null = null;
  selectedRating: number = 0;
  isModalOpen: boolean = false; // Gère l'affichage de la modal

  constructor(private restaurantService: RestaurantService) {}

  ngOnInit(): void {
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

  // Ouvre la modal de notation
  openRatingModal(restaurant: Restaurant) {
    this.selectedRestaurant = restaurant;
    this.selectedRating = 0;
    this.isModalOpen = true;
  }

  // Sélectionne une note
  selectRating(star: number) {
    this.selectedRating = star;
  }

  // Soumet la note
  submitRating() {
    if (this.selectedRestaurant) {
      console.log(`Note attribuée à ${this.selectedRestaurant.name} : ${this.selectedRating} étoiles`);

      this.restaurantService.rateRestaurant(this.selectedRestaurant.id, this.selectedRating).subscribe({
        next: () => {
          alert("Note enregistrée !");
          this.selectedRestaurant = null;
          this.selectedRating = 0;
          this.isModalOpen = false; // Ferme la modal
        },
        error: (err) => {
          console.error("Erreur lors de l'enregistrement de la note", err);
        }
      });
    }
  }

  // Ferme la modal
  closeModal() {
    this.isModalOpen = false;
  }
}
