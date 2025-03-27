import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { User, UserRole } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users'; // Remplace par ton API
  private currentUser: User | null = null;

  private fakeUsers: User[] = [
    { id: 0, login: 'owner', password: 'ownerpass', userRole: UserRole.owner, notes: new Map(), resto: [] },
    { id: 1, login: 'user', password: 'userpass', userRole: UserRole.customer, notes: new Map(), resto: [] },
    { id: 2, login: 'admin', password: 'adminpass', userRole: UserRole.admin, notes: new Map(), resto: [] }
  ];

  constructor(private http: HttpClient) {}

  /** 🔹 Récupère l'utilisateur connecté */
  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const userData = localStorage.getItem('currentUser');
      if (userData) {
        this.currentUser = JSON.parse(userData);
      }
    }
    return this.currentUser;
  }

  /** 🔹 Récupère le rôle de l'utilisateur connecté */
  getUserRole(): UserRole | null {
    return this.getCurrentUser()?.userRole ?? null;
  }

  /** 🔹 Connexion */
  login(login: string, password: string): Observable<User | null> {
    const user = this.fakeUsers.find(u => u.login === login && u.password === password);
    if (user) {
      this.currentUser = user;
      localStorage.setItem('currentUser', JSON.stringify(user)); // Stocke l'utilisateur
    }
    return of(user ?? null);
  }

  /** 🔹 Déconnexion */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
  }
}
