import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsByProjetComponent } from './interventions-by-projet.component';

describe('InterventionsByProjetComponent', () => {
  let component: InterventionsByProjetComponent;
  let fixture: ComponentFixture<InterventionsByProjetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionsByProjetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionsByProjetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
