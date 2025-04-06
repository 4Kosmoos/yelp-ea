import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { User, UserRole } from '../models/restaurant.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/users'; // Remplace par ton API
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable(); // Observable exposé

  private fakeUsers: User[] = [
    { id: 1, login: 'admin', password: 'adminpass', role: UserRole.admin, notes: new Map(), resto: [] },
    { id: 2, login: 'user', password: 'userpass', role: UserRole.customer, notes: new Map(), resto: [] },
    { id: 3, login: 'user2', password: 'user2pass', role: UserRole.customer, notes: new Map(), resto: [] },
    { id: 4, login: 'owner', password: 'ownerpass', role: UserRole.owner, notes: new Map(), resto: [] },
    { id: 5, login: 'owner2', password: 'owner2pass', role: UserRole.owner, notes: new Map(), resto: [] }
  ];

  constructor(private http: HttpClient) {
    this.loadStoredUser(); // Charger l'utilisateur stocké au démarrage
  }

  /** 🔹 Charge l'utilisateur stocké dans `localStorage` */
  private loadStoredUser(): void {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        if (user && user.id && user.login && user.role) {
          // Convertir les notes en Map<number, number> si elles sont sous forme d'objet
          if (user.notes && !(user.notes instanceof Map)) {
            user.notes = new Map<number, number>(
              Object.entries(user.notes).map(([key, value]) => [Number(key), Number(value)])
            );
          }
          this.currentUserSubject.next(user);
        }
      } catch (error) {
        console.error('Erreur lors du chargement de l’utilisateur stocké', error);
        localStorage.removeItem('currentUser'); // Nettoyer en cas de corruption
      }
    }
  }


  /** 🔹 Connexion */
  login(login: string, password: string): Observable<User | null> {
    const user = this.fakeUsers.find(u => u.login === login && u.password === password);
    if (user) {
      // Convertir la Map en un objet classique avant de stocker dans localStorage
      const userCopy = { ...user, notes: Object.fromEntries(user.notes) };
      localStorage.setItem('currentUser', JSON.stringify(userCopy)); // Stocker l'utilisateur converti
      this.currentUserSubject.next(user); // Met à jour l'observable
    }
    return of(user ?? null);
  }

  /** 🔹 Déconnexion */
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null); // Met à jour l'observable
  }

  /** 🔹 Vérifie si un utilisateur est connecté */
  isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }

  /** 🔹 Récupère l'utilisateur courant */
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  /** 🔹 Observable de l'utilisateur courant */
  getCurrentUserObservable(): Observable<User | null> {
    return this.currentUser$;
  }

  /** 🔹 Récupère le rôle de l'utilisateur connecté */
  getUserRole(): UserRole | null {
    return this.getCurrentUser()?.role ?? null;
  }

  /** 🔹 Met à jour l'utilisateur courant */
  setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentOwnerId(): number {
    // Ici, tu peux récupérer l'ID de l'utilisateur authentifié (par exemple via un token JWT ou autre méthode)
    return 3;  // Simule un restaurateur avec ID 3 pour l'exemple
  }
}
