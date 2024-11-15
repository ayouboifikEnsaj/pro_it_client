import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionsProjetEgeteComponent } from './interventions-projet-egete.component';

describe('InterventionsProjetEgeteComponent', () => {
  let component: InterventionsProjetEgeteComponent;
  let fixture: ComponentFixture<InterventionsProjetEgeteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionsProjetEgeteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionsProjetEgeteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
