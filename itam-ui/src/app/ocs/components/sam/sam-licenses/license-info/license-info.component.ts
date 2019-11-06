import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OcsService } from '../../../../ocs.service';

@Component({
  selector: 'app-license-info',
  templateUrl: './license-info.component.html',
  styleUrls: ['./license-info.component.css','../../../../ocs.component.css']
})
export class LicenseInfoComponent implements OnInit {
  @Output() baseHeaderInfo = new EventEmitter<any>();
  dataLoader:boolean;
  licenseId:any;
  selectedLicenseDetails:any;
  childMultipleLicenseDetails:any=[];
  childMaintenanceLicenseDetails:any=[];
  constructor(private route: ActivatedRoute, private ocsService:OcsService) {
    this.route.params.subscribe((params: Params) => {
      this.licenseId = params['id'];
    });
   }

  ngOnInit() {
    this.getLicenseDetails();
  }

  getLicenseDetails(){
    this.dataLoader = true;
    this.ocsService.getLicenseDetails(this.licenseId, resp=>{
      this.selectedLicenseDetails = resp.data;
      this.getBaseHeaderInfo(this.selectedLicenseDetails);
      this.getMultiplePOLicenseDetails();
    }, error=>{

    })
  }

  getMultiplePOLicenseDetails(){
    this.ocsService.getChildLicensesInfo(this.licenseId,'Multiple PO License', resp=>{
      this.childMultipleLicenseDetails = resp.data;
      this.getManintenanceLicenseDetails();
    }, error=>{})
  }

  getManintenanceLicenseDetails(){
    this.ocsService.getChildLicensesInfo(this.licenseId,'Maintenance PO License', resp=>{
      this.childMaintenanceLicenseDetails = resp.data;
      this.dataLoader = false;
    }, error=>{})
  }

  getBaseHeaderInfo(basicDetails){
    this.baseHeaderInfo.emit({
      "licenseName" : basicDetails.name,
      "vendor" : basicDetails.vendor.name,
      "purchaseCount": basicDetails.licenseCount,
      "availableCount" : basicDetails.availableCount,
    })
  }

}
