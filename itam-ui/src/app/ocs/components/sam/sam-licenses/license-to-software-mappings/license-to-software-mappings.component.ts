import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OcsService } from '../../../../ocs.service';

@Component({
  selector: 'app-license-to-software-mappings',
  templateUrl: './license-to-software-mappings.component.html',
  styleUrls: ['./license-to-software-mappings.component.css', '../../../../ocs.component.css']
})
export class LicenseToSoftwareMappingsComponent implements OnInit {
  dataLoader:boolean;
  licenseId:any;
  licenseCapacityType:any;
  licenseCalculationData:any = [];
  licenseToSoftwareMappings:any=[];
  constructor(private route: ActivatedRoute, private ocsService:OcsService) {
    this.route.params.subscribe((params: Params) => {
      this.licenseId = params['id'];
    });
   }

  ngOnInit() {
    this.getLicenseDetails();
  }

  getLicenseDetails(){
    this.ocsService.getLicenseDetails(this.licenseId, resp=>{
      this.licenseCapacityType = resp.data.capacityTypeDto.id;
      this.getLicenseToSoftwareMappings(this.licenseCapacityType);
    }, error=>{})
  }

  getLicenseToSoftwareMappings(capacityType){
    this.dataLoader = true;
    this.ocsService.getSoftwareMappingForSelectedLicense(this.licenseId, resp=>{
      this.licenseToSoftwareMappings = resp.data;
      this.getLicenseCalculations(capacityType);
      this.dataLoader = false;
    }, error=>{

    })
  }

  getLicenseCalculations(capacityTypeId){
    this.ocsService.licenseMappingCalculation(this.licenseId,capacityTypeId, resp=>{
      this.licenseCalculationData = resp.data;
    }, error=>{

    })
  }
}
