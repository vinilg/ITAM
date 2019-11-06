import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSoftwareSuiteDialogComponent } from './add-software-suite-dialog.component';

describe('AddSoftwareSuiteDialogComponent', () => {
  let component: AddSoftwareSuiteDialogComponent;
  let fixture: ComponentFixture<AddSoftwareSuiteDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSoftwareSuiteDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSoftwareSuiteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
