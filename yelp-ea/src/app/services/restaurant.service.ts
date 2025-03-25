import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  private restaurants: Restaurant[] = [
    {
      id: 1,
      nom: 'Chez Luigi',
      adresse: '10 Rue de Paris, 75001 Paris',
      description: 'Un excellent restaurant italien.',
      categorie: 'Italien',
      coordonnees: '01 23 45 67 89',
      noteMoyenne: 4.5,
      idUser: 101, // ID d’un restaurateur fictif
    },
    {
      id: 2,
      nom: 'Le Gourmet',
      adresse: '15 Avenue de Lyon, 69000 Lyon',
      description: 'Cuisine française raffinée.',
      categorie: 'Français',
      coordonnees: '04 56 78 90 12',
      noteMoyenne: 4.2,
      idUser: 102,
    },
    {
      id: 3,
      nom: 'Sushi Master',
      adresse: '5 Quai de Marseille, 13000 Marseille',
      description: 'Les meilleurs sushis en ville.',
      categorie: 'Japonais',
      coordonnees: '06 12 34 56 78',
      noteMoyenne: 4.8,
      idUser: 103,
    }
  ];

  constructor() {}

  getRestaurants(): Restaurant[] {
    return this.restaurants;
  }

  addRestaurant(restaurant: Restaurant) {
    restaurant.id = this.restaurants.length + 1;
    this.restaurants.push(restaurant);
  }
}
