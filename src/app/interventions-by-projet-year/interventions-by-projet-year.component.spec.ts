import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsByProjetYearComponent } from './interventions-by-projet-year.component';

describe('InterventionsByProjetYearComponent', () => {
  let component: InterventionsByProjetYearComponent;
  let fixture: ComponentFixture<InterventionsByProjetYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionsByProjetYearComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionsByProjetYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
