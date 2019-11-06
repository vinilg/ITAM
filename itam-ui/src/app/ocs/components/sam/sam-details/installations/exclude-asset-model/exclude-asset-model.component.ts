import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';
import { OcsService } from '../../../../../ocs.service';
import { SnackBarService } from '../../../../../../base/services/snack-bar.service';

@Component({
  selector: 'app-exclude-asset-model',
  templateUrl: './exclude-asset-model.component.html',
  styleUrls: ['./exclude-asset-model.component.css', '../../../../../ocs.component.css']
})
export class ExcludeAssetModelComponent implements OnInit {
  dataLoader:boolean;
  excludeAssetModelObj:any = {};
  postExcludeObj:any = {};
  softwareId:any;
  constructor(private snackBar:SnackBarService,private ocsService:OcsService, public dialogRef: MatDialogRef<ExcludeAssetModelComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.excludeAssetModelObj = this.data;
  }

  onCancelModel(){
    this.dialogRef.close();
  }

  onExcludeAsset(data){
    this.dataLoader = true;
    this.postExcludeObj = {
      "softwareId":data.softwareId,
      "licenseId":data.selectedLicense,
      "reasonId":data.selectedReason,
      "excludedAssets":data.selectedAssets,
      "comments":data.comments
    }
    this.ocsService.postExcludeAssetToLicenseMappings(this.postExcludeObj, resp=>{
      if(resp.responseCode == 0){
        this.dataLoader = false;
        this.snackBar.openSnackBar('Assets Excluded Successfully', '','success-snackbar');
        this.onCancelModel();
      }
    }, error=>{})
  }

}
