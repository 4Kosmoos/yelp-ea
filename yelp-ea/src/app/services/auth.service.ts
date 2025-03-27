import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User, UserRole } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/users'; // Remplace par ton API
  private currentUser: User | null = null;
  private currentUserSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);

  private fakeUsers: User[] = [
    { id: 3, login: 'owner', password: 'ownerpass', userRole: UserRole.owner, notes: new Map(), resto: [] },
    { id: 2, login: 'user', password: 'userpass', userRole: UserRole.customer, notes: new Map(), resto: [] },
    { id: 1, login: 'admin', password: 'adminpass', userRole: UserRole.admin, notes: new Map(), resto: [] }
  ];

  constructor(private http: HttpClient) {
    // Charger l'utilisateur stocké si disponible
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      this.currentUserSubject.next(this.currentUser); // Émettre l'utilisateur courant
    }
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser(): User | null {
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
      localStorage.setItem('currentUser', JSON.stringify(user)); // Stocker l'utilisateur
      this.currentUserSubject.next(user); // Émettre l'utilisateur courant
    }
    return of(user ?? null);
  }

  /** 🔹 Déconnexion */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUser = null;
    this.currentUserSubject.next(null); // Émettre null pour signaler que l'utilisateur est déconnecté
  }

  /** 🔹 Observable pour l'utilisateur courant */
  getCurrentUserObservable(): Observable<User | null> {
    return this.currentUserSubject.asObservable();
  }
}
