import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SamDetailsComponent } from './sam-details.component';

describe('SamDetailsComponent', () => {
  let component: SamDetailsComponent;
  let fixture: ComponentFixture<SamDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SamDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SamDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
