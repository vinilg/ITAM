import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamSummaryComponent } from './sam-summary.component';

describe('SamSummaryComponent', () => {
  let component: SamSummaryComponent;
  let fixture: ComponentFixture<SamSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
