import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminNavbarComponent } from '../../admin-navbar/admin-navbar';
@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [CommonModule, RouterLink, AdminNavbarComponent],
  templateUrl: './admin-home.html',
  styleUrl: './admin-home.css'
})
export class AdminHomeComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('adminToken')) {
      this.router.navigate(['/']);
    }
  }
}