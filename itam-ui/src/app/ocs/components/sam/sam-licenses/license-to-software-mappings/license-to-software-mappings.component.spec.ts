import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseToSoftwareMappingsComponent } from './license-to-software-mappings.component';

describe('LicenseToSoftwareMappingsComponent', () => {
  let component: LicenseToSoftwareMappingsComponent;
  let fixture: ComponentFixture<LicenseToSoftwareMappingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LicenseToSoftwareMappingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LicenseToSoftwareMappingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
