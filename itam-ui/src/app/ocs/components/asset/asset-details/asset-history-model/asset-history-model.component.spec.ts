import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetHistoryModelComponent } from './asset-history-model.component';

describe('AssetHistoryModelComponent', () => {
  let component: AssetHistoryModelComponent;
  let fixture: ComponentFixture<AssetHistoryModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetHistoryModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetHistoryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
