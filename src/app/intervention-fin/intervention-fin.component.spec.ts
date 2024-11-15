import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionFinComponent } from './intervention-fin.component';

describe('InterventionFinComponent', () => {
  let component: InterventionFinComponent;
  let fixture: ComponentFixture<InterventionFinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionFinComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionFinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
