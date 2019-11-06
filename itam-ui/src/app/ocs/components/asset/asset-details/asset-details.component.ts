import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { OcsService } from './../../../ocs.service';
import { MatDialog } from '@angular/material';
import { AssetHistoryModelComponent } from './asset-history-model/asset-history-model.component';
import { AssetHostDetailsComponent } from './asset-host-details/asset-host-details.component';

@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css', '../../../ocs.component.css']
})
export class AssetDetailsComponent implements OnInit {
  assetId: any;
  assetData:any;
  ipAddress:any = '';
  isRelationship:boolean;
  showSoftware: boolean;
  isSoftware:boolean;
  availableCategories:any=[];
  isEdit:boolean;
  assetHistoryModelObj:any = {};
  dataLoader:boolean;
  hostDetailsNotAvailable:boolean;
  assetHostDetails:any = {
    "hostDetails":{},
    "vmDetails":[]
  }
  constructor(private route: ActivatedRoute,private router:Router, private ocsService: OcsService, public dialog: MatDialog) {
    this.route.params.subscribe((params: Params) => {
      this.assetId = params['id'];
    });
  }

  ngOnInit() {
    this.dataLoader = true;
    this.getFilterMasterData();
    
  }

  getFilterMasterData() {
    this.ocsService.getFilterMasterData(resp => {
      this.availableCategories = resp.data.allAvaiableCategories;
      this.ocsService.getAssetBaseDetails(this.assetId, resp =>{
        this.assetData = resp.data;
        for(let category in this.availableCategories){
          if(this.assetData.assetCategory.id == 1 || this.assetData.assetCategory.id == 2 || this.assetData.assetCategory.id == 3 || this.assetData.assetCategory.id == 4 || this.assetData.assetCategory.id == 41 || this.assetData.assetCategory.id == 42 || this.assetData.assetCategory.id == 43 || this.assetData.assetCategory.id == 44){
            this.showSoftware = true;
          }
        }
        if(resp.data.physicalHostDetails != null){
          this.assetHostDetails.hostDetails = resp.data.physicalHostDetails;
          this.hostDetailsNotAvailable = false;
          this.ocsService.vcenterHostDetails(this.assetHostDetails.hostDetails.hostName, resp=>{
            this.assetHostDetails.vmDetails = resp.data;
            this.dataLoader = false;
          }, error=>{})
        }else{
          this.dataLoader = false;
          this.hostDetailsNotAvailable = true;
        }
        this.getAssetHistoryDetails();
      }, error =>{ })
    }, error => { })
  }


  getAssetHistoryDetails(){
    this.ocsService.getUserHistoryForSelectedCi(this.assetId, resp=>{
        this.assetHistoryModelObj = {
          "assetHistoryDetails" : resp.data,
          "assetName" : this.assetData.hardwareName
        }
    }, error=>{})
  }

  getIpInfo(data){
    this.ipAddress = data.ipAddress
  }

  loadTabComponent(event){
    if(event.tab.textLabel == "Relationship"){
      this.isRelationship = true;
    }
    if(event.tab.textLabel == "Software"){
      this.isSoftware = true;
    }
  }

  onClickAssetEdit(){
    this.isEdit = true;
  }

  submitEventHandler(event){
    if(event == "Updated SuccessFully"){
      this.isEdit = false;
      this.getFilterMasterData();
    }else if(event == "Cancel Event"){
      this.isEdit = false;
    }
  }

  onHistory(){
    const dialogRef = this.dialog.open(AssetHistoryModelComponent, {
      width: '600px',
      data: this.assetHistoryModelObj
    });
  }

  onHost(){
    const dialogRef = this.dialog.open(AssetHostDetailsComponent, {
      width:'1000px',
      data: this.assetHostDetails
    });
  }

}
