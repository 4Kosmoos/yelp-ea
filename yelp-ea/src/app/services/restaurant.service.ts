import { Injectable } from '@angular/core';
import {Restaurant, RestaurantCategories} from '../models/restaurant.model';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  readonly API_URL = "http://localhost:8080/restaurants"; // URL de base de l'API

  constructor(private httpClient: HttpClient) { } // Injection du service HttpClient

  //recupéré tous les restaurants
  getRestaurants(): Observable<Restaurant[]> {
    return this.httpClient.get<Restaurant[]>(`${this.API_URL}/all`);
  }

  //Récupéré le restaurant via son Id
  getRestaurantById(id: number): Observable<Restaurant> {
    return this.httpClient.get<Restaurant>(`${this.API_URL}/${id}`);
  }

  //Ajouter un restaurant
  addRestaurant(newRestaurant: any): Observable<any> {
    return this.httpClient.post(this.API_URL, newRestaurant); // Assure-toi que l
  }
  //Modifier un restaurant
  updateRestaurant(id: number, updatedRestaurant: any): Observable<any> {
    // On envoie une requête PUT vers l'API pour mettre à jour le restaurant
    return this.httpClient.put(`${this.API_URL}/${id}`, updatedRestaurant);
  }
  //Supprimer un restaurant
  deleteRestaurant(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${id}`);
  }

  rateRestaurant(id: number, rating: number) {
    return this.httpClient.post(`/${id}/rate`, { rating });
  }


}
