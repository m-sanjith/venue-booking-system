import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminApiService } from '../../service/admin-api';
@Component({
  selector: 'app-manage-bookings',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manage-bookings.html',
  styleUrl: './manage-bookings.css'
})
export class ManageBookingsComponent implements OnInit {
  bookings: any[] = [];
  groupedBookings: { date: string; items: any[] }[] = [];
  error = '';
  updatingBookingId: string | null = null;

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

    this.loadBookings();
  }

  trackByBookingId(index: number, booking: any) {
    return booking._id;
  }

  loadBookings() {
    this.api.getBookings().subscribe({
      next: (res) => {
        this.bookings = [...(res.data || [])];
        this.groupBookingsByDate();
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load bookings';
        this.cdr.detectChanges();
      }
    });
  }

  groupBookingsByDate() {
    const grouped: { [key: string]: any[] } = {};

    for (const booking of this.bookings) {
      const bookingDate = booking.date || 'No Date';
      if (!grouped[bookingDate]) {
        grouped[bookingDate] = [];
      }
      grouped[bookingDate].push(booking);
    }

    this.groupedBookings = Object.keys(grouped)
      .sort()
      .map((date) => ({
        date,
        items: grouped[date]
      }));
  }

  changeBookingStatus(id: string, status: string) {
    if (this.updatingBookingId === id) return;

    this.error = '';
    this.updatingBookingId = id;

    this.api.updateBookingStatus(id, status).subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.bookings = this.bookings.map((booking) =>
            booking._id === id
              ? { ...booking, status: res.data.status }
              : booking
          );

          this.groupBookingsByDate();
        }

        this.updatingBookingId = null;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to update booking status';
        this.updatingBookingId = null;
        this.cdr.detectChanges();
      }
    });
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToManageVenues() {
    this.router.navigate(['/manage-venues']);
  }

  logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUsername');
    this.router.navigate(['/']);
  }
}