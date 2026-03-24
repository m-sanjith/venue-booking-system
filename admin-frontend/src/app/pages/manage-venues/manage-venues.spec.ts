import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVenuesComponent } from './manage-venues';

describe('ManageVenues', () => {
  let component: ManageVenuesComponent;
  let fixture: ComponentFixture<ManageVenuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageVenuesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ManageVenuesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
