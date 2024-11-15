import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionHistoriqueAeroportComponent } from './intervention-historique-aeroport.component';

describe('InterventionHistoriqueAeroportComponent', () => {
  let component: InterventionHistoriqueAeroportComponent;
  let fixture: ComponentFixture<InterventionHistoriqueAeroportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionHistoriqueAeroportComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionHistoriqueAeroportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
