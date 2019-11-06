import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-asset-family-details-dialog',
  templateUrl: './asset-family-details-dialog.component.html',
  styleUrls: ['./asset-family-details-dialog.component.css', '../../../../ocs.component.css']
})
export class AssetFamilyDetailsDialogComponent implements OnInit {
  familyWiseCategoryDialogData:any =[];
  constructor(public dialogRef: MatDialogRef<AssetFamilyDetailsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.familyWiseCategoryDialogData = this.data;
  }
}
