import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';  // Pour ngIf, ngFor, etc.

@Component({
  selector: 'app-header',
  standalone: true,  // Indiquer que ce composant est standalone
  imports: [CommonModule],  // Ajouter CommonModule
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  // Définir un rôle en dur pour l'utilisateur
  userRole: string = 'restaurateur';  // Change cette valeur pour tester les autres rôles

  constructor() { }

  ngOnInit(): void {
    // Ici, on pourrait récupérer le rôle d'un utilisateur authentifié si c'était le cas
    // Par exemple, this.userRole = this.userService.getUserRole();
  }

  // Méthodes pour gérer les actions des boutons
  viewRestaurants() {
    console.log('Affichage des restaurants du restaurateur');
  }

  addRestaurant() {
    console.log('Ajout d’un restaurant');
  }

  viewAllRestaurants() {
    console.log('Affichage de tous les restaurants');
  }

  otherPage() {
    console.log('Autre page');
  }

  viewUsers() {
    console.log('Affichage des utilisateurs');
  }

  viewRestaurateurs() {
    console.log('Affichage des restaurateurs');
  }
}
