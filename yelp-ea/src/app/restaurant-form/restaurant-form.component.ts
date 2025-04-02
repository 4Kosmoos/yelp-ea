import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service';
import { FormsModule } from '@angular/forms';
import { RestaurantCategories } from '../models/restaurant.model';  // Assurez-vous que l'enum est bien importé.
import { NgForOf } from '@angular/common'; // Import de l'énumération

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

  categories = Object.keys(RestaurantCategories).map((key) => ({
    name: key,  // Utilisation des clés de l'énumération comme chaîne
    selected: false  // par défaut, aucune catégorie sélectionnée
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
  ownerId: number = 3; // ID de l'utilisateur restaurateur, à remplacer par la logique d'authentification

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
        // Marquer les catégories comme sélectionnées selon les données du restaurant
        this.categories.forEach((category) => {
          if (this.newRestaurant.categories.includes(category.name)) {
            category.selected = true;
          }
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement du restaurant', error);
      }
    });
  }

  onSubmit() {
    this.errorMessage = ''; // Réinitialiser les erreurs avant envoi
    if (this.isEditMode) {
      this.updateRestaurant();
    } else {
      this.addRestaurant();
    }
  }

  addRestaurant() {
    console.log('newRestaurant avant envoi :', JSON.stringify(this.newRestaurant, null, 2));

    // Vérifie chaque catégorie et effectue un mapping explicite
    const mappedCategories = this.newRestaurant.categories.map((cat: string) => {
      console.log('Catégorie avant mapping :', cat);
      // Le mapping devient plus simple avec un enum basé sur des chaînes
      if (Object.values(RestaurantCategories).includes(cat as RestaurantCategories)) {
        return cat;  // Nous n'avons plus besoin de faire un mapping complexe
      } else {
        console.error(`Catégorie invalide : ${cat}`);
        return null;  // Si la catégorie n'est pas valide, retourner null ou une valeur par défaut
      }
    }).filter(Boolean);  // Filtre les valeurs nulles

    console.log('Catégories après mapping :', mappedCategories);

    const newRestaurant = {
      name: this.newRestaurant.name,
      address: this.newRestaurant.address,
      phone: this.newRestaurant.phone,
      description: this.newRestaurant.description,
      categories: mappedCategories,  // Utilisation des catégories mappées
      rating: this.newRestaurant.rating
    };

    console.log("Données envoyées à l'API : ", JSON.stringify(newRestaurant, null, 2));

    this.restaurantService.addRestaurantForOwner(this.ownerId, newRestaurant).subscribe({
      next: () => this.router.navigate(['/dashboard-restaurateur']),
      error: (error) => {
        console.error('Erreur lors de l’ajout du restaurant', error);
        this.errorMessage = "Impossible d'ajouter le restaurant. Vérifie les données.";
        console.log('Détails de l\'erreur :', error);  // Log des erreurs détaillées
      }
    });
  }



  updateRestaurant() {
    const selectedCategories = this.newRestaurant.categories.map((cat: string) =>
      RestaurantCategories[cat as keyof typeof RestaurantCategories]  // Conversion des catégories en enum
    );

    const updatedRestaurant = {
      name: this.newRestaurant.name,
      address: this.newRestaurant.address,
      phone: this.newRestaurant.phone,
      description: this.newRestaurant.description,
        categories: ['Chinois'],  // Tester avec une catégorie simple

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
