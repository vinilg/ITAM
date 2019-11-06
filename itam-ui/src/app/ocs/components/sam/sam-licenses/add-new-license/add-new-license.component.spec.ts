import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewLicenseComponent } from './add-new-license.component';

describe('AddNewLicenseComponent', () => {
  let component: AddNewLicenseComponent;
  let fixture: ComponentFixture<AddNewLicenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewLicenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
