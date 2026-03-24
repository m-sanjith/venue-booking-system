import { Routes } from '@angular/router';
import { AdminLoginComponent } from './pages/admin-login/admin-login';
import { AdminHomeComponent } from './pages/admin-home/admin-home';
import { AddVenueComponent } from './pages/add-venue/add-venue';
import { ManageVenuesComponent } from './pages/manage-venues/manage-venues';
import { ManageBookingsComponent } from './pages/manage-bookings/manage-bookings';

export const routes: Routes = [
  { path: '', component: AdminLoginComponent },
  { path: 'dashboard', component: AdminHomeComponent },
  { path: 'add-venue', component: AddVenueComponent },
  { path: 'manage-venues', component: ManageVenuesComponent },
  { path: 'manage-bookings', component: ManageBookingsComponent }
];