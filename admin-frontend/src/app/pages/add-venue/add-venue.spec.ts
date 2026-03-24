import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVenueComponent } from './add-venue';

describe('AddVenue', () => {
  let component: AddVenueComponent;
  let fixture: ComponentFixture<AddVenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVenueComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddVenueComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
