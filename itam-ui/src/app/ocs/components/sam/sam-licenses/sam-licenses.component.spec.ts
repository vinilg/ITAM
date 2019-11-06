import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamLicensesComponent } from './sam-licenses.component';

describe('SamLicensesComponent', () => {
  let component: SamLicensesComponent;
  let fixture: ComponentFixture<SamLicensesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamLicensesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamLicensesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
