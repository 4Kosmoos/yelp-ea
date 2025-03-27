import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';  // Import du HeaderComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, HeaderComponent], // Ajoute les modules nécessaires
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  showHeader: boolean = true;

  constructor(private router: Router) {
    // Vérifier l'URL actuelle et désactiver l'affichage du header sur la page de connexion
    this.router.events.subscribe(() => {
      if (this.router.url === '/login') {
        this.showHeader = false; // Ne pas afficher le header sur la page de login
      } else {
        this.showHeader = true; // Afficher le header sur toutes les autres pages
      }
    });
  }

}
