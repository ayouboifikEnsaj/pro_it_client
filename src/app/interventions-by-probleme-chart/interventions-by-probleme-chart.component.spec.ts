import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsByProblemeChartComponent } from './interventions-by-probleme-chart.component';

describe('InterventionsByProblemeChartComponent', () => {
  let component: InterventionsByProblemeChartComponent;
  let fixture: ComponentFixture<InterventionsByProblemeChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionsByProblemeChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionsByProblemeChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
