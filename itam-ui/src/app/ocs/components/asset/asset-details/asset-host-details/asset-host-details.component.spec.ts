import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetHostDetailsComponent } from './asset-host-details.component';

describe('AssetHostDetailsComponent', () => {
  let component: AssetHostDetailsComponent;
  let fixture: ComponentFixture<AssetHostDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetHostDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetHostDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
