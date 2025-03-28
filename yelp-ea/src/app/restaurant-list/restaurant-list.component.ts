import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant, User } from '../models/restaurant.model';
import { AuthService } from '../services/auth.service';
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
  currentUser: User | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadRestaurants(); // Charge les restaurants au démarrage

    // 🔹 Abonne-toi à l'utilisateur courant pour le récupérer automatiquement
    this.authService.getCurrentUserObservable().subscribe(user => {
      this.currentUser = user;
      console.log("Utilisateur connecté :", this.currentUser);
    });
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
    if (this.selectedRestaurant && this.currentUser) { // 🔹 Vérifie si l'utilisateur est connecté
      console.log("Restaurant sélectionné :", this.selectedRestaurant);
      console.log("Note sélectionnée :", this.selectedRating);

      const userId = this.currentUser.id;
      const restaurantId = this.selectedRestaurant.id;
      const rating = this.selectedRating;

      console.log("Données envoyées au serveur :");
      console.log(`userId: ${userId}, restaurantId: ${restaurantId}, rating: ${rating}`);

      // Appel du service pour ajouter la note
      this.userService.addRating(userId, restaurantId, rating).subscribe({
        next: (user) => {
          console.log("Réponse du serveur : Note enregistrée", user);
          this.loadRestaurants();
          this.selectedRestaurant = null;
          this.selectedRating = 0;
          this.isModalOpen = false; // Ferme la modal
        },
        error: (err) => {
          console.error("Erreur lors de l'enregistrement de la note", err);
        }
      });
    } else {
      console.error("Aucun utilisateur connecté. Impossible d'enregistrer la note.");
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
