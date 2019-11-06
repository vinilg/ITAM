import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareSuiteDialogComponent } from './software-suite-dialog.component';

describe('SoftwareSuiteDialogComponent', () => {
  let component: SoftwareSuiteDialogComponent;
  let fixture: ComponentFixture<SoftwareSuiteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoftwareSuiteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SoftwareSuiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
