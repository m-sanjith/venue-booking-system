import { Component, ChangeDetectorRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AdminApiService } from '../../service/admin-api';
@Component({
  selector: 'app-add-venue',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-venue.html',
  styleUrl: './add-venue.css'
})
export class AddVenueComponent {
  message = '';
  error = '';
  loading = false;
  imagePreview = '';

  venueForm = {
    name: '',
    capacity: 0,
    location: '',
    description: '',
    image: ''
  };

  constructor(
    private api: AdminApiService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  onImageSelect(event: Event) {
  const input = event.target as HTMLInputElement;
  const file = input.files?.[0];

  if (!file) return;

  this.error = '';

  if (!file.type.startsWith('image/')) {
    this.error = 'Please select a valid image file';
    this.imagePreview = '';
    this.venueForm.image = '';
    return;
  }

  const maxSize = 2 * 1024 * 1024;

  if (file.size > maxSize) {
    this.error = 'Image is too large. Please select an image below 2 MB.';
    this.imagePreview = '';
    this.venueForm.image = '';
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    const result = reader.result as string;
    this.imagePreview = result;
    this.venueForm.image = result;
  };

  reader.readAsDataURL(file);
}

  addVenue() {
    if (this.loading) return;

    this.message = '';
    this.error = '';

    if (!this.venueForm.name || !this.venueForm.capacity || !this.venueForm.location) {
      this.error = 'Fill all required fields';
      return;
    }

    this.loading = true;

    this.api.addVenue(this.venueForm).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = res.message || 'Venue added successfully';

        this.venueForm = {
          name: '',
          capacity: 0,
          location: '',
          description: '',
          image: ''
        };

        this.imagePreview = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.message || 'Failed to add venue';
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