import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminApiService } from '../../service/admin-api';
@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.html',
  styleUrl: './admin-login.css'
})
export class AdminLoginComponent {
  username = '';
  password = '';
  error = '';
  loading = false;

  constructor(
    private api: AdminApiService,
    private router: Router
  ) {}

  login() {
    if (this.loading) return;

    this.error = '';

    if (!this.username || !this.password) {
      this.error = 'Enter username and password';
      return;
    }

    this.loading = true;

    this.api.adminLogin({
      username: this.username.trim(),
      password: this.password
    }).subscribe({
      next: (res) => {
        this.loading = false;

        if (res.success) {
          localStorage.setItem('adminToken', res.token);
          localStorage.setItem('adminUsername', res.admin.username);
          this.router.navigate(['/dashboard']);
        } else {
          this.error = res.message || 'Login failed';
        }
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Login failed';
      }
    });
  }
}