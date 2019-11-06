import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeHardwareDataComponent } from './administrative-hardware-data.component';

describe('AdministrativeHardwareDataComponent', () => {
  let component: AdministrativeHardwareDataComponent;
  let fixture: ComponentFixture<AdministrativeHardwareDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdministrativeHardwareDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdministrativeHardwareDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
