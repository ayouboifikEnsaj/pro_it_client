import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProblemeDialogComponent } from './probleme-dialog.component';

describe('ProblemeDialogComponent', () => {
  let component: ProblemeDialogComponent;
  let fixture: ComponentFixture<ProblemeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProblemeDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProblemeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
