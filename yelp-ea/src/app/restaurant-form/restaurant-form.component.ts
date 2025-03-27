import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RestaurantService } from '../services/restaurant.service'; // Import du service
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-restaurant-form',
  templateUrl: './restaurant-form.component.html',
  imports: [
    FormsModule
  ],
  styleUrls: ['./restaurant-form.component.css']
})
export class RestaurantFormComponent implements OnInit {
  newRestaurant: any = {
    name: '',
    address: '',
    phone: '',
    description: '',
    categories: '',  // String (sera converti en tableau)
    rating: 0
  };
  isEditMode: boolean = false;
  restaurantId: number | null = null;
  errorMessage: string = ''; // Pour afficher les erreurs

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
    // Conversion des catégories en tableau si nécessaire
    const formattedCategories = this.newRestaurant.categories
      ? this.newRestaurant.categories.split(',').map((c: string) => c.trim())
      : [];

    const newRestaurant = {
      name: this.newRestaurant.name,
      address: this.newRestaurant.address,
      phone: this.newRestaurant.phone,
      description: this.newRestaurant.description,
      categories: formattedCategories, // Envoie un tableau au backend
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
    let formattedCategories: string[];

    if (Array.isArray(this.newRestaurant.categories)) {
      // Si categories est déjà un tableau, on l'utilise directement
      formattedCategories = this.newRestaurant.categories.map((c: string) => c.trim());
    } else if (typeof this.newRestaurant.categories === 'string') {
      // Si categories est une chaîne de caractères, on la divise
      formattedCategories = this.newRestaurant.categories
        ? this.newRestaurant.categories.split(',').map((c: string) => c.trim())
        : [];
    } else {
      // Si categories est de type inconnu, on le considère comme un tableau vide
      formattedCategories = [];
    }

    const updatedRestaurant = {
      name: this.newRestaurant.name,
      address: this.newRestaurant.address,
      phone: this.newRestaurant.phone,
      description: this.newRestaurant.description,
      categories: formattedCategories,
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
