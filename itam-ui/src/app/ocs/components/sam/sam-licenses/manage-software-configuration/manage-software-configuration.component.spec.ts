import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSoftwareConfigurationComponent } from './manage-software-configuration.component';

describe('ManageSoftwareConfigurationComponent', () => {
  let component: ManageSoftwareConfigurationComponent;
  let fixture: ComponentFixture<ManageSoftwareConfigurationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSoftwareConfigurationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSoftwareConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
