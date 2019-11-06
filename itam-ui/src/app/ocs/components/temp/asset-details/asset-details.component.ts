import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OcsService } from './../../../ocs.service';

@Component({
  selector: 'app-temp-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.css','../../../ocs.component.css']
})
export class TempAssetDetailsComponent implements OnInit {
  assetId: any;
  assetData:any;
  basicAssetDetails:any = {
    assetName:'',
    source:'',
    connectedUser:''
  }
  ipAddress:any = '';
  isRelationship:boolean;
  isSoftware:boolean;
  constructor(private route: ActivatedRoute, private ocsService: OcsService) {
    this.route.params.subscribe((params: Params) => {
      this.assetId = params['id'];
    });
  }

  ngOnInit() {
    this.ocsService.getTempAssetBaseDetails(this.assetId, resp =>{
      this.assetData = resp.data;
      this.basicAssetDetails = {
        assetName: this.assetData.hardwareName,
        source:this.assetData.sourceName,
        connectedUser:this.assetData.connectedUser
      }
    }, error =>{ })

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

}
