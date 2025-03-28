import {Component, OnInit} from '@angular/core';
import {Restaurant, User} from '../models/restaurant.model';
import {RestaurantService} from '../services/restaurant.service';
import {UserService} from '../services/UserService';

@Component({
  selector: 'app-restaurant-liste-note',
  imports: [],
  templateUrl: './restaurant-liste-note.component.html',
  styleUrl: './restaurant-liste-note.component.css'
})
export class RestaurantListeNoteComponent implements OnInit {
  restaurants: Restaurant[] = [];
  ratedRestaurants: Restaurant[] = [];
  currentUser: User | null = null;

  constructor(
    private restaurantService: RestaurantService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = 1;

    this.userService.getUserById(userId).subscribe({
      next: (user) => {
        this.currentUser = user;

        if (this.currentUser) {
          this.restaurantService.getRestaurants().subscribe({
            next: (data) => {
              this.restaurants = data;
              this.ratedRestaurants = this.restaurants.filter(restaurant =>
                this.currentUser!.notes.has(restaurant.id)
              );
            },
            error: (err) => {
              console.error('Erreur lors de la récupération des restaurants', err);
            }
          });
        }
      },
      error: (err) => {
        console.error('Erreur lors de la récupération de l\'utilisateur', err);
      }
    });
  }
}
