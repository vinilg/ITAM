import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-asset-host-details',
  templateUrl: './asset-host-details.component.html',
  styleUrls: ['./asset-host-details.component.css','../../../../ocs.component.css']
})
export class AssetHostDetailsComponent implements OnInit {

  hostDetails:any = {};
  vmDetails:any = [];
  constructor(public dialogRef: MatDialogRef<AssetHostDetailsComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.hostDetails = this.data.hostDetails;
    this.vmDetails = this.data.vmDetails;
  }

}
