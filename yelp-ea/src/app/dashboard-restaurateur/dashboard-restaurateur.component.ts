import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // À importer
import { RestaurantService } from '../services/restaurant.service';
import { Restaurant } from '../models/restaurant.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-restaurateur',
  standalone: true, // Si tu utilises standalone
  imports: [CommonModule, FormsModule], // Ajout de CommonModule pour *ngIf et *ngFor
  templateUrl: './dashboard-restaurateur.component.html',
  styleUrls: ['./dashboard-restaurateur.component.css']
})
export class DashboardRestaurateurComponent implements OnInit {
    restaurants: Restaurant[] = [];
    showForm = false;

    newRestaurant: Restaurant = {
      id: 0,
      nom: '',
      adresse: '',
      description: '',
      categorie: 'Autre',
      coordonnees: '',
      noteMoyenne: 0,
      idUser: 101
    };

    constructor(private restaurantService: RestaurantService) {}

    ngOnInit() {
      this.restaurants = [
        { id: 1, nom: 'Le Gourmet Parisien', adresse: '12 Rue de Rivoli', description: 'Cuisine raffinée', categorie: 'Français', coordonnees: '06 47 68 43 18', noteMoyenne: 4.5, idUser: 101 },
        { id: 2, nom: 'Sushi Zen', adresse: '25 Rue des Sushis', description: 'Meilleurs sushis', categorie: 'Japonais', coordonnees: '03 04 05 06 07', noteMoyenne: 4.7, idUser: 101 },
        { id: 3, nom: 'Pizza Napoli', adresse: '8 Avenue du Colisée', description: 'Pizzas au feu de bois', categorie: 'Italien', coordonnees: '07 71 20 44 21', noteMoyenne: 4.2, idUser: 101 }
      ];
    }

    toggleForm() {
      this.showForm = !this.showForm;
    }

    addRestaurant() {
      if (this.newRestaurant.nom && this.newRestaurant.adresse && this.newRestaurant.description) {
        this.restaurantService.addRestaurant({ ...this.newRestaurant });
        this.restaurants = this.restaurantService.getRestaurants(); // Mise à jour
        this.newRestaurant = { id: 0, nom: '', adresse: '', description: '', categorie: 'Autre', coordonnees: '', noteMoyenne: 0, idUser: 101 };
        this.showForm = false;
      }
    }
}
