import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/UserService';
import { User, UserRole } from '../models/restaurant.model';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-all-user',
  templateUrl: './all-user.component.html',
  styleUrls: ['./all-user.component.css'],
  imports: [NgForOf, NgIf],
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
        // Si 'role' vient de l'API, on mappe 'role' vers 'userRole' si nécessaire
        this.users = data.map((user: any) => ({
          ...user,
          userRole: this.mapRoleToEnum(user.role),  // Conversion si nécessaire
        }));
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erreur lors de la récupération des utilisateurs', err);
        this.errorMessage = 'Erreur lors du chargement des utilisateurs.';
        this.isLoading = false;
      },
    });
  }

  mapRoleToEnum(role: string): UserRole {
    switch (role) {
      case 'client':
        return UserRole.customer;
      case 'proprietaire':
        return UserRole.owner;
      case 'admin':
        return UserRole.admin;
      default:
        return UserRole.customer; // Valeur par défaut
    }
  }

  deleteUser(user: User): void {
    if (user.role === 'admin') {
      alert('Vous ne pouvez pas supprimer un administrateur !');
      return;
    }

    if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      return;
    }

    this.userService.deleteUser(user.id).subscribe({
      next: () => {
        this.loadUsers();
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de l\'utilisateur', err);
        alert('Impossible de supprimer l\'utilisateur.');
      },
    });
  }

  protected readonly UserRole = UserRole;
}
