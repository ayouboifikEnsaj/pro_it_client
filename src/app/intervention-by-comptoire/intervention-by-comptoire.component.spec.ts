import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionByComptoireComponent } from './intervention-by-comptoire.component';

describe('InterventionByComptoireComponent', () => {
  let component: InterventionByComptoireComponent;
  let fixture: ComponentFixture<InterventionByComptoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionByComptoireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionByComptoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
