import { Component, OnInit } from '@angular/core';
import { Restaurant, User } from '../models/restaurant.model';
import { RestaurantService } from '../services/restaurant.service';
import { UserService } from '../services/UserService';
import { CommonModule, NgClass, NgForOf, NgIf } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-retaurant-note-user-liste',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    NgClass,
    CommonModule
  ],
  templateUrl: './retaurant-note-user-liste.component.html',
  styleUrls: ['./retaurant-note-user-liste.component.css']
})

export class RetaurantNoteUserListeComponent implements OnInit {
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
    this.authService.getCurrentUserObservable().subscribe(user => {
      this.currentUser = user;
      this.loadRestaurants();  // Charger les restaurants une fois l'utilisateur récupéré
    });
  }

  // Charger les restaurants notés par l'utilisateur
  loadRestaurants() {
    if (this.currentUser) {
      this.restaurantService.getRestaurantsRatedByUser(this.currentUser.id).subscribe({
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
  }

  // Ouvrir la modale de notation
  openRatingModal(restaurant: Restaurant) {
    this.selectedRestaurant = restaurant;
    this.selectedRating = 0;
    this.isModalOpen = true;
  }

  // Sélectionner la note
  selectRating(star: number) {
    this.selectedRating = star;
  }

  // Soumettre la note
  submitRating() {
    if (this.selectedRestaurant && this.currentUser) {
      const userId = this.currentUser.id;
      const restaurantId = this.selectedRestaurant.id;
      const rating = this.selectedRating;

      this.userService.addRating(userId, restaurantId, rating).subscribe({
        next: (user) => {
          console.log("Réponse du serveur : Note enregistrée", user);
          this.loadRestaurants();  // Recharger les restaurants
          this.selectedRestaurant = null;  // Réinitialiser la sélection
          this.selectedRating = 0;  // Réinitialiser la note
          this.isModalOpen = false;  // Fermer la modale
        },
        error: (err) => {
          console.error("Erreur lors de l'enregistrement de la note", err);
        }
      });
    } else {
      console.error("Utilisateur non connecté ou restaurant non sélectionné.");
    }
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
