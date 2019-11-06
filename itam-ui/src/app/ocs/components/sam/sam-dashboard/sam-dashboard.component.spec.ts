import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamDashboardComponent } from './sam-dashboard.component';

describe('SamDashboardComponent', () => {
  let component: SamDashboardComponent;
  let fixture: ComponentFixture<SamDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
