import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetFamilyDetailsDialogComponent } from './asset-family-details-dialog.component';

describe('AssetFamilyDetailsDialogComponent', () => {
  let component: AssetFamilyDetailsDialogComponent;
  let fixture: ComponentFixture<AssetFamilyDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetFamilyDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetFamilyDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
