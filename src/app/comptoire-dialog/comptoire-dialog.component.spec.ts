import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComptoireDialogComponent } from './comptoire-dialog.component';

describe('ComptoireDialogComponent', () => {
  let component: ComptoireDialogComponent;
  let fixture: ComponentFixture<ComptoireDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComptoireDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComptoireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
