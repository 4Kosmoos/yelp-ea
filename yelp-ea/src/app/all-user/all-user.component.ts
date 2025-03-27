import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import {User} from '../models/restaurant.model';
import {NgForOf, NgIf} from '@angular/common';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css'],
  imports: [
    NgForOf,
    NgIf
  ]
})
export class AllUserComponent implements OnInit {
  users: User[] = [];
  isLoading = true;
  errorMessage: string | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.userService.getUser().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs', err);
        this.errorMessage = "Erreur lors du chargement des utilisateurs.";
        this.isLoading = false;
      }
    });
  }

  deleteUser(userId: number): void {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      return;
    }

    this.userService.deleteUser(userId).subscribe({
      next: () => {
        this.loadUsers(); // Recharge la liste des utilisateurs après suppression
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', err);
        alert("Impossible de supprimer l'utilisateur.");
      }
    });
  }


}
