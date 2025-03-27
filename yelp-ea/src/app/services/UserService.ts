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
}
