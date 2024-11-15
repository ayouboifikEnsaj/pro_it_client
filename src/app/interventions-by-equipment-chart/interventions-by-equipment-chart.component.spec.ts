import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsByEquipmentChartComponent } from './interventions-by-equipment-chart.component';

describe('InterventionsByEquipmentChartComponent', () => {
  let component: InterventionsByEquipmentChartComponent;
  let fixture: ComponentFixture<InterventionsByEquipmentChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionsByEquipmentChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionsByEquipmentChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
