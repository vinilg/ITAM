import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewRelationshipModalComponent } from './add-new-relationship-modal.component';

describe('AddNewRelationshipModalComponent', () => {
  let component: AddNewRelationshipModalComponent;
  let fixture: ComponentFixture<AddNewRelationshipModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNewRelationshipModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewRelationshipModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
