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
  addRestaurant(name: string, address: string, phone: string, description: string, category: RestaurantCategories[], rating: number): Observable<Restaurant> {
    let params = new URLSearchParams();
    params.set('name', name);
    params.set('address', address);
    params.set('phone', phone);
    params.set('description', description);
    params.set('category', JSON.stringify(category));
    params.set('rating', rating.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.httpClient.post<Restaurant>(`${this.API_URL}/add`, params.toString(), { headers });
  }

  //Modifier un restaurant

  //Supprimer un restaurant
  deleteRestaurant(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.API_URL}/delete/${id}`);
  }

}
