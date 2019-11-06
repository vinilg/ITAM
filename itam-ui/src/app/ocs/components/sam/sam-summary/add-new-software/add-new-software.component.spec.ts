import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewSoftwareComponent } from './add-new-software.component';

describe('AddNewSoftwareComponent', () => {
  let component: AddNewSoftwareComponent;
  let fixture: ComponentFixture<AddNewSoftwareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewSoftwareComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewSoftwareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
