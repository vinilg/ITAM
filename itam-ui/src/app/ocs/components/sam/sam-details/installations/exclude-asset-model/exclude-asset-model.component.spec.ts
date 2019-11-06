import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExcludeAssetModelComponent } from './exclude-asset-model.component';

describe('ExcludeAssetModelComponent', () => {
  let component: ExcludeAssetModelComponent;
  let fixture: ComponentFixture<ExcludeAssetModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExcludeAssetModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExcludeAssetModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
