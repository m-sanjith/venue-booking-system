import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminApiService } from '../../service/admin-api';
@Component({
  selector: 'app-manage-venues',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-venues.html',
  styleUrl: './manage-venues.css'
})
export class ManageVenuesComponent implements OnInit {
  venues: any[] = [];
  error = '';
  message = '';
  updatingVenueId: string | null = null;
  deletingVenueId: string | null = null;

  constructor(
    private api: AdminApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      this.router.navigate(['/']);
      return;
    }

    this.loadVenues();
  }

  trackByVenueId(index: number, venue: any) {
    return venue._id;
  }

  loadVenues() {
    this.api.getVenues().subscribe({
      next: (res) => {
        this.venues = [...(res.data || [])];
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load venues';
        this.cdr.detectChanges();
      }
    });
  }

  changeVenueStatus(id: string, status: string) {
    if (this.updatingVenueId === id) return;

    this.error = '';
    this.message = '';
    this.updatingVenueId = id;

    this.api.updateVenueStatus(id, status).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.venues = this.venues.map((venue) =>
            venue._id === id
              ? { ...venue, status: res.data.status }
              : venue
          );
        }

        this.updatingVenueId = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to update venue status';
        this.updatingVenueId = null;
        this.cdr.detectChanges();
      }
    });
  }

  deleteVenue(id: string) {
    if (this.deletingVenueId === id) return;

    const confirmDelete = confirm(
      'Are you sure you want to delete this venue? Related student bookings will be marked as "Venue Removed".'
    );

    if (!confirmDelete) return;

    this.error = '';
    this.message = '';
    this.deletingVenueId = id;

    this.api.deleteVenue(id).subscribe({
      next: (res) => {
        this.venues = this.venues.filter((venue) => venue._id !== id);
        this.message = res.message || 'Venue deleted successfully';
        this.deletingVenueId = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to delete venue';
        this.deletingVenueId = null;
        this.cdr.detectChanges();
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToAddVenue() {
    this.router.navigate(['/add-venue']);
  }

  logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    this.router.navigate(['/']);
  }
}