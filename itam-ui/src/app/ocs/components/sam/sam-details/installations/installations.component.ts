import { Component, OnInit } from '@angular/core';
import { OcsService } from '../../../../ocs.service';
import { ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { ExcludeAssetModelComponent } from './exclude-asset-model/exclude-asset-model.component';

@Component({
  selector: 'app-installations',
  templateUrl: './installations.component.html',
  styleUrls: ['./installations.component.css','../../../../ocs.component.css']
})
export class InstallationsComponent implements OnInit {
  selectedTab:any=0;
  dataLoader:boolean;
  softwareId:any;
  installationDetails:any = [];
  excludedInstallationDetails:any = [];
  listOfAssetsToExclude:any = [];
  postExcludeObj:any = {};
  licenseDetailsForSelectedSoftware:any = [];
  reasonMaster:any = [];
  constructor(private route: ActivatedRoute, private ocsService:OcsService, public dialog: MatDialog) {
    this.route.params.subscribe((params: Params) => {
      this.softwareId = params['id'];
    });
   }

  ngOnInit() {
    this.getLicenseInfoForSelectedSoftware();
  }

  getInstallationDetails(){
    this.installationDetails = [];
    this.dataLoader = true;
    this.ocsService.getInstallationDetailsForSelectedSoftware(this.softwareId, resp=>{
      this.installationDetails = resp.data;
      this.getExcludedAssets();
      this.dataLoader = false;
    }, error=>{

    })
  }

  getLicenseInfoForSelectedSoftware(){
    this.dataLoader = true;
    this.ocsService.getLicenseDetailsForSelectedSoftware(this.softwareId, resp=>{
      this.licenseDetailsForSelectedSoftware = resp.data;
      this.getAssetsExcludeReasonMaster();
      this.getInstallationDetails();
    }, error=>{})
  }

  getAssetsExcludeReasonMaster(){
    this.ocsService.getAssetExcludeReasonMaster(resp=>{
      this.reasonMaster = resp.data;
    }, error=>{})
  }

  getExcludedAssets(){
    this.dataLoader = true;
    this.ocsService.getExcludedAssetInstalltionDetails(this.softwareId, resp=>{
      this.excludedInstallationDetails = resp.data;
      this.dataLoader = false;
    }, error=>{

    })
  }

  openExcludePopup(){
    this.postExcludeObj = {
      "reasonMaster" : this.reasonMaster,
      "licenses" : this.licenseDetailsForSelectedSoftware,
      "selectedAssets" : this.listOfAssetsToExclude,
      "softwareId":this.softwareId
    }
    const dialogRef = this.dialog.open(ExcludeAssetModelComponent, {
      width: '600px',
      data: this.postExcludeObj 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getInstallationDetails();
    });
  }

  loadTabComponent(event) {
    if(event.index == 1){
      this.selectedTab = 1;
      this.getExcludedAssets();
    }else{
      this.selectedTab = 0;
    }
  }

  onAssetExcludeChange(obj, event){
    if(event.checked){
      this.listOfAssetsToExclude.push(obj.id);
    }else {
      this.listOfAssetsToExclude.splice(this.listOfAssetsToExclude.indexOf(obj.id),1)
    }
  }

  onExcludeAssets(){
    this.dataLoader = true;
    this.ocsService.postExcludeAssetToLicenseMappings(this.postExcludeObj, resp=>{

    }, error=>{

    })
  }

}
