import { Injectable } from '@angular/core';
import { Restaurant } from '../models/restaurant.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  readonly API_URL = "http://localhost:8080/restaurants";

  constructor(private httpClient: HttpClient) { }

  // Récupérer tous les restaurants
  getRestaurants(): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${this.API_URL}/all`);
  }

  // Récupérer un restaurant par son Id
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${this.API_URL}/${id}`);
  }

  // Récupérer les restaurants d'un propriétaire
  getRestaurantsForOwner(ownerId: number): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${this.API_URL}/owner/${ownerId}`);
  }

  // Ajouter un restaurant pour un propriétaire
  addRestaurantForOwner(ownerId: number, newRestaurant: any): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/owner/${ownerId}`, newRestaurant);
  }

  // Modifier un restaurant
  updateRestaurant(id: number, updatedRestaurant: any): Observable<any> {
    return this.httpClient.put(`${this.API_URL}/${id}`, updatedRestaurant);
  }

  // Supprimer un restaurant
  deleteRestaurant(id: number): Observable<String> {
    return this.httpClient.delete(`${this.API_URL}/${id}`, { responseType: 'text' });
  }

  // Noter un restaurant
  rateRestaurant(id: number, rating: number): Observable<any> {
    return this.httpClient.post(`${this.API_URL}/${id}/rate`, { rating });
  }

  // Récupérer les restaurants notés par un utilisateur
  getRestaurantsRatedByUser(userId: number): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${this.API_URL}/ratedBy/${userId}`);
  }
}
