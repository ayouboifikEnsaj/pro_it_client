import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AeroportDialogComponent } from './aeroport-dialog.component';

describe('AeroportDialogComponent', () => {
  let component: AeroportDialogComponent;
  let fixture: ComponentFixture<AeroportDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AeroportDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AeroportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
