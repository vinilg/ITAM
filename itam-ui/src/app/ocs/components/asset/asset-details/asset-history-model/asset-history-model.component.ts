import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-asset-history-model',
  templateUrl: './asset-history-model.component.html',
  styleUrls: ['./asset-history-model.component.css', '../../../../ocs.component.css']
})
export class AssetHistoryModelComponent implements OnInit {
  dataLoader:boolean;
  assetHistoryDetails:any=[];
  assetName:any;
  constructor(public dialogRef: MatDialogRef<AssetHistoryModelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.assetHistoryDetails = this.data.assetHistoryDetails;
    this.assetName = this.data.assetName

  }

}
