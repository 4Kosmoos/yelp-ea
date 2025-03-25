import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Simule la récupération du rôle utilisateur (idéalement stocké dans le token ou le localStorage)
  getUserRole(): string {
    return localStorage.getItem('userRole') || ''; // Récupère le rôle stocké
  }

  // Simule une connexion (à remplacer par une vraie logique d'authentification)
  login(role: string) {
    localStorage.setItem('userRole', role);
  }

  logout() {
    localStorage.removeItem('userRole');
  }
}
