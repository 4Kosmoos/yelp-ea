import { Component, OnInit } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
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
  ratedRestaurants: Restaurant[] = [];
  currentUserId: number = 2; // À récupérer dynamiquement après implémentation de l'authentification
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
    console.log('Composant initialisé');
    console.log(`ID utilisateur actuel : ${this.currentUserId}`);
    this.loadRestaurants();
  }

  loadRestaurants() {
    this.isLoading = true;
    this.restaurantService.getRestaurantsRatedByUser(this.currentUserId).subscribe({
      next: (data) => {
        console.log('Données reçues de l\'API :', data);
        this.ratedRestaurants = data || []; // On s'assure qu'on a bien un tableau
        console.log('ratedRestaurants après affectation :', this.ratedRestaurants);
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des restaurants notés', err);
        this.ratedRestaurants = []; // Si erreur, on met un tableau vide
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

      const user = this.authService.getCurrentUser();
      const userId = user ? user.id : 2; // Utilise l'ID de l'utilisateur connecté, ou un ID par défaut
      const restaurantId = this.selectedRestaurant.id;
      const rating = this.selectedRating;

      console.log("Données envoyées au serveur :", { userId, restaurantId, rating });

      this.userService.addRating(userId, restaurantId, rating).subscribe({
        next: (user) => {
          console.log("Réponse du serveur : Note enregistrée", user);
          this.loadRestaurants();
          this.selectedRestaurant = null;
          this.selectedRating = 0;
          this.isModalOpen = false;
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
