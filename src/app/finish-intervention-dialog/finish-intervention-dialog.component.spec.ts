import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishInterventionDialogComponent } from './finish-intervention-dialog.component';

describe('FinishInterventionDialogComponent', () => {
  let component: FinishInterventionDialogComponent;
  let fixture: ComponentFixture<FinishInterventionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinishInterventionDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishInterventionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
