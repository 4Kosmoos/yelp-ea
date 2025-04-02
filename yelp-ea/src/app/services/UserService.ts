import { Injectable } from '@angular/core';
import {User} from '../models/restaurant.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService{
  readonly API_URL = "http://localhost:8080/users"; // URL de base de l'API

  constructor(private httpClient: HttpClient) { } // Injection du service HttpClient

  getUser(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.API_URL}/all`);
  }

  getUserById(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.API_URL}/${id}`);
  }

  deleteUser(id: number): Observable<string> {
    return this.httpClient.delete(`${this.API_URL}/delete/${id}`, { responseType: 'text' });
  }

  addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.API_URL}/add`, user);
  }

  updateUser(id: number, updatedUser: User): Observable<User> {
    return this.httpClient.put<User>(`${this.API_URL}/update/${id}`, updatedUser);
  }

  addRating(userId: number, restaurantId: number, rating: number): Observable<User> {
    const url = `${this.API_URL}/${userId}/rate/${restaurantId}?rating=${rating}`;

    // Si le backend attend un corps (body) avec ces informations, tu peux l'envoyer comme suit
    const body = { rating };

    return this.httpClient.post<User>(url, body);  // Envoi de rating dans le corps de la requête
  }
}
