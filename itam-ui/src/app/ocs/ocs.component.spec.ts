import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OcsComponent } from './ocs.component';

describe('OcsComponent', () => {
  let component: OcsComponent;
  let fixture: ComponentFixture<OcsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
