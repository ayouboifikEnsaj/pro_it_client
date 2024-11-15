import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TBFDashboardComponent } from './tbfdashboard.component';

describe('TBFDashboardComponent', () => {
  let component: TBFDashboardComponent;
  let fixture: ComponentFixture<TBFDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TBFDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TBFDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
