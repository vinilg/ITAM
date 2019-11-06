import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsIoComponent } from './forms-io.component';

describe('FormsIoComponent', () => {
  let component: FormsIoComponent;
  let fixture: ComponentFixture<FormsIoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsIoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsIoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
