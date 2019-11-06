import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { OcsService } from './../../../ocs.service';

@Component({
  selector: 'app-administrative-hardware-data',
  templateUrl: './administrative-hardware-data.component.html',
  styleUrls: ['./administrative-hardware-data.component.css', '../../../ocs.component.css']
})
export class AdministrativeHardwareDataComponent implements OnInit {

  assetId: any;
  assetDetails: any = {};
  headers: any = {};
  administrativeDetails: any = [];
  fileSystemDetails: any = [];
  netstatDetails: any = [];
  dataLoader: boolean;
  showContractDetails:boolean;
  @Output() ipInfo = new EventEmitter<any>();

  constructor(private route: ActivatedRoute, private ocsService: OcsService) {
    this.route.params.subscribe((params: Params) => {
      this.assetId = params['id'];
    });
  }

  ngOnInit() {
    this.getHeaders();
  }

  getAssetDetails() {
    this.dataLoader = true;
    this.ocsService.getAssetDetails(this.assetId, resp => {
      this.assetDetails = resp.data;
      if(this.assetDetails.basicHardwareDetails.assetCategory.id != 45){
        this.showContractDetails = true;
      }
      this.fileSystemDetails = this.assetDetails.fileSystems;
      this.netstatDetails = this.assetDetails.netstatDetails;
      if (Object.keys(this.assetDetails.headersDetails).length > 0) {
        for (let asset in this.assetDetails.headersDetails) {
          var headerName = this.headers[asset];
          this.administrativeDetails.push({ headerName: this.headers[asset], values: this.assetDetails.headersDetails[asset] })
        }
        if(this.showContractDetails){
          this.getIpInfo(this.assetDetails.headersDetails[Object.keys(this.assetDetails.headersDetails)[1]]['Ip Address']);
        }else{
          this.getIpInfo(null);
        }
      } else {
        this.getIpInfo(null);
      }
      this.dataLoader = false;
    }, err => {
    })
  }

  getHeaders() {
    this.ocsService.getHeaders(resp => {
      this.headers = resp.data;
      this.getAssetDetails();
    }, err => {
    })
  }

  getIpInfo(ipAddress) {
    this.ipInfo.emit({ 'ipAddress': ipAddress });
  }
}
