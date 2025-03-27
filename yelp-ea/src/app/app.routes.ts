import { Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { LoginComponent } from './login/login.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { DashboardRestaurateurComponent } from './dashboard-restaurateur/dashboard-restaurateur.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuardRestaurateur } from './guards/auth-restaurateur.guard';
import { AuthGuardAdmin } from './guards/auth-admin.guard';
import {RestaurantListeNoteComponent} from './restaurant-liste-note/restaurant-liste-note.component';
import {RetaurantNoteUserListeComponent} from './retaurant-note-user-liste/retaurant-note-user-liste.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'restaurant', component: RestaurantListComponent },
  { path: 'ListeRestaurantNote', component: RestaurantListeNoteComponent },
  { path: 'restaurantNote', component: RetaurantNoteUserListeComponent },
  { path: 'restaurant/:id', component: RestaurantDetailComponent },
  { path: 'ajout', component: RestaurantFormComponent, canActivate: [AuthGuardRestaurateur] },
  { path: 'edit/:id', component: RestaurantFormComponent, canActivate: [AuthGuardRestaurateur] },
  { path: 'dashboard-restaurateur', component: DashboardRestaurateurComponent }, //, canActivate: [AuthGuardRestaurateur]
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuardAdmin] }
];
