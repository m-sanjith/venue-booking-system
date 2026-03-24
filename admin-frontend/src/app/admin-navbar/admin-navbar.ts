import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-navbar.html',
  styleUrl: './admin-navbar.css'
})
export class AdminNavbarComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    this.router.navigate(['https://venue-booking-system.vercel.app']);
  }
}