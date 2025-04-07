import { Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { LoginComponent } from './login/login.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { DashboardRestaurateurComponent } from './dashboard-restaurateur/dashboard-restaurateur.component';
import { AuthGuardRestaurateur } from './guards/auth-restaurateur.guard';
import { AuthGuardAdmin } from './guards/auth-admin.guard';
import {RetaurantNoteUserListeComponent} from './retaurant-note-user-liste/retaurant-note-user-liste.component';
import {AllUserComponent} from './all-user/all-user.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'restaurant', component: RestaurantListComponent },
  { path: 'restaurantNote', component: RetaurantNoteUserListeComponent },
  { path: 'allUser', component: AllUserComponent},
  { path: 'ajout', component: RestaurantFormComponent, canActivate: [AuthGuardRestaurateur] },
  { path: 'edit/:id', component: RestaurantFormComponent, canActivate: [AuthGuardRestaurateur] },
  { path: 'dashboard-restaurateur', component: DashboardRestaurateurComponent },
  { path: 'allRestaurant', component: RestaurantDetailComponent, canActivate: [AuthGuardAdmin] },
  { path: '**', component: PageNotFoundComponent }
];
