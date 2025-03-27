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

  addRestaurant() {
    console.log('Ajout d’un restaurant');
    // Logique pour ajouter un restaurant, rediriger vers un formulaire, etc.
    this.router.navigate(['/ajout']); // Exemple de redirection vers la page d'ajout
  }


  toggleForm() {
    this.showForm = !this.showForm;
  }
}
