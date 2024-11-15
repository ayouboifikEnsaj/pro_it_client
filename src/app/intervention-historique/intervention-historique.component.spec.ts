import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionHistoriqueComponent } from './intervention-historique.component';

describe('InterventionHistoriqueComponent', () => {
  let component: InterventionHistoriqueComponent;
  let fixture: ComponentFixture<InterventionHistoriqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionHistoriqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionHistoriqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
