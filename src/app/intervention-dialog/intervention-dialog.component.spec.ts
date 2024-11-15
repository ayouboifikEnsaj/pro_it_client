import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionDialogComponent } from './intervention-dialog.component';

describe('InterventionDialogComponent', () => {
  let component: InterventionDialogComponent;
  let fixture: ComponentFixture<InterventionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
