import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant, User } from '../models/restaurant.model';
import { AuthService } from '../services/auth.service'; // Import du service AuthService
import { CommonModule } from '@angular/common';
import { NgClass } from '@angular/common';
import { UserService } from '../services/UserService';

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
  isModalOpen: boolean = false;

  constructor(
    private restaurantService: RestaurantService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRestaurants();  // Charge les restaurants au démarrage
  }

  // Fonction pour charger les restaurants
  loadRestaurants() {
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

  openRatingModal(restaurant: Restaurant) {
    this.selectedRestaurant = restaurant;
    this.selectedRating = 0;
    this.isModalOpen = true;
  }

  selectRating(star: number) {
    this.selectedRating = star;
  }

  submitRating() {
    if (this.selectedRestaurant) {
      console.log("Restaurant sélectionné :", this.selectedRestaurant);
      console.log("Note sélectionnée :", this.selectedRating);

      const user = this.authService.getCurrentUser();  // Récupère l'utilisateur connecté
      const userId = user ? user.id : 1;  // Utilise l'ID de l'utilisateur connecté, ou un ID par défaut
      const restaurantId = this.selectedRestaurant.id;
      const rating = this.selectedRating;

      console.log("Données envoyées au serveur :");
      console.log(`userId: ${userId}, restaurantId: ${restaurantId}, rating: ${rating}`);

      // Appel du service pour ajouter la note
      this.userService.addRating(userId, restaurantId, rating).subscribe({
        next: (user) => {
          console.log("Réponse du serveur : Note enregistrée", user);
          // Recharge la liste des restaurants après l'ajout de la note
          this.loadRestaurants();
          this.selectedRestaurant = null;
          this.selectedRating = 0;
          this.isModalOpen = false;  // Ferme la modal
        },
        error: (err) => {
          console.error("Erreur lors de l'enregistrement de la note", err);
        }
      });
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
