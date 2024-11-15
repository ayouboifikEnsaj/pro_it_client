import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbfChartComponent } from './tbf-chart.component';

describe('TbfChartComponent', () => {
  let component: TbfChartComponent;
  let fixture: ComponentFixture<TbfChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TbfChartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TbfChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
