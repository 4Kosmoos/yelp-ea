import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import {FormsModule} from '@angular/forms';
import {RestaurantCategories} from '../models/restaurant.model';
import {NgForOf} from '@angular/common'; // Import de l'énumération

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  imports: [FormsModule, NgForOf],
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  newRestaurant: any = {
    name: '',
    address: '',
    phone: '',
    description: '',
    categories: [],  // Initialisation des catégories comme un tableau vide
    rating: 0
  };

  categories = Object.values(RestaurantCategories).map(category => ({
    name: category,
    selected: false // par défaut, aucune catégorie sélectionnée
  }));

  // Récupérer les catégories sélectionnées
  onCategoryChange(category: { name: string, selected: boolean }) {
    if (category.selected) {
      this.newRestaurant.categories.push(category.name);
    } else {
      const index = this.newRestaurant.categories.indexOf(category.name);
      if (index > -1) {
        this.newRestaurant.categories.splice(index, 1);
      }
    }
  }

  isEditMode: boolean = false;
  restaurantId: number | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private restaurantService: RestaurantService
  ) {}

  ngOnInit() {
    this.restaurantId = this.route.snapshot.paramMap.get('id') ? +this.route.snapshot.paramMap.get('id')! : null;
    if (this.restaurantId) {
      this.isEditMode = true;
      this.loadRestaurant();
    }
  }

  loadRestaurant() {
    this.restaurantService.getRestaurantById(this.restaurantId!).subscribe({
      next: (restaurant: any) => {
        this.newRestaurant = { ...restaurant };
        // Si nécessaire, vous pouvez manipuler les catégories ici pour les afficher comme sélectionnées
      },
      error: (error) => {
        console.error('Erreur lors du chargement du restaurant', error);
      }
    });
  }

  onSubmit() {
    this.errorMessage = ''; // Reset erreur avant envoi
    if (this.isEditMode) {
      this.updateRestaurant();
    } else {
      this.addRestaurant();
    }
  }

  addRestaurant() {
    // Envoyer les catégories sélectionnées sous forme de tableau
    const selectedCategories = this.newRestaurant.categories;

    const newRestaurant = {
      name: this.newRestaurant.name,
      address: this.newRestaurant.address,
      phone: this.newRestaurant.phone,
      description: this.newRestaurant.description,
      category: selectedCategories,  // Tableau des catégories sélectionnées
      rating: this.newRestaurant.rating
    };

    console.log('Données envoyées à l’API :', JSON.stringify(newRestaurant, null, 2));

    this.restaurantService.addRestaurant(newRestaurant).subscribe({
      next: () => {
        this.router.navigate(['/dashboard-restaurateur']);
      },
      error: (error) => {
        console.error('Erreur lors de l’ajout du restaurant', error);
        this.errorMessage = "Impossible d'ajouter le restaurant. Vérifie les données.";
      }
    });
  }

  updateRestaurant() {
    const selectedCategories = this.newRestaurant.categories;

    const updatedRestaurant = {
      name: this.newRestaurant.name,
      address: this.newRestaurant.address,
      phone: this.newRestaurant.phone,
      description: this.newRestaurant.description,
      category: selectedCategories,  // Tableau des catégories sélectionnées
      rating: this.newRestaurant.rating
    };

    console.log('Données mises à jour envoyées à l’API :', JSON.stringify(updatedRestaurant, null, 2));

    this.restaurantService.updateRestaurant(this.restaurantId!, updatedRestaurant).subscribe({
      next: () => {
        this.router.navigate(['/dashboard-restaurateur']);
      },
      error: (error) => {
        console.error('Erreur lors de la mise à jour', error);
        this.errorMessage = "Impossible de mettre à jour le restaurant.";
      }
    });
  }
}
