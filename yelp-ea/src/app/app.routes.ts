import { Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantFormComponent } from './restaurant-form/restaurant-form.component';
import { DashboardRestaurateurComponent } from './dashboard-restaurateur/dashboard-restaurateur.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AuthGuardRestaurateur } from './guards/auth-restaurateur.guard';
import { AuthGuardAdmin } from './guards/auth-admin.guard';


export const routes: Routes = [
    { path: '', redirectTo: 'dashboard-restaurateur', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'restaurant', component: RestaurantListComponent },
    { path: 'restaurant/:id', component: RestaurantDetailComponent },
    { path: 'restaurant/new', component: RestaurantFormComponent, canActivate: [AuthGuardRestaurateur] },
    { path: 'restaurant/edit/:id', component: RestaurantFormComponent, canActivate: [AuthGuardRestaurateur] },
    { path: 'dashboard-restaurateur', component: DashboardRestaurateurComponent}, //, canActivate: [AuthGuardRestaurateur]
    { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuardAdmin] },
  ];
