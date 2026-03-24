import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminApiService {
  private apiUrl = 'https://venue-booking-system-yktl.onrender.com';
  constructor(private http: HttpClient) {}

  getToken() {
    return localStorage.getItem('adminToken') || '';
  }

  private authHeaders() {
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`
      })
    };
  }

  adminLogin(data: { username: string; password: string }) {
    return this.http.post<any>(`${this.apiUrl}/api/admin/login`, data);
  }

  getVenues() {
    return this.http.get<any>(`${this.apiUrl}/api/venues`);
  }

  addVenue(data: {
    name: string;
    capacity: number;
    location: string;
    description: string;
    image: string;
  }) {
    return this.http.post<any>(`${this.apiUrl}/api/venues`, data, this.authHeaders());
  }

  updateVenueStatus(id: string, status: string) {
    return this.http.put<any>(
      `${this.apiUrl}/api/venues/${id}/status`,
      { status },
      this.authHeaders()
    );
  }

  getBookings() {
    return this.http.get<any>(`${this.apiUrl}/api/bookings`, this.authHeaders());
  }

  updateBookingStatus(id: string, status: string) {
    return this.http.put<any>(
      `${this.apiUrl}/api/bookings/${id}/status`,
      { status },
      this.authHeaders()
    );
  }

  deleteVenue(id: string) {
  return this.http.delete<any>(
    `${this.apiUrl}/api/venues/${id}`,
    this.authHeaders()
  );
}
}