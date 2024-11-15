import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterventionDialogHelpComponent } from './intervention-dialog-help.component';

describe('InterventionDialogHelpComponent', () => {
  let component: InterventionDialogHelpComponent;
  let fixture: ComponentFixture<InterventionDialogHelpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InterventionDialogHelpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterventionDialogHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
