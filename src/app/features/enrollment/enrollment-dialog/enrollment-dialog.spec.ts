import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollmentDialog } from './enrollment-dialog';

describe('EnrollmentDialog', () => {
  let component: EnrollmentDialog;
  let fixture: ComponentFixture<EnrollmentDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollmentDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnrollmentDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
