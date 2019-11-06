import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OcsService } from '../../../../ocs.service';

@Component({
  selector: 'app-license-details',
  templateUrl: './license-details.component.html',
  styleUrls: ['./license-details.component.css','../../../../ocs.component.css']
})
export class LicenseDetailsComponent implements OnInit {
  licenseId:any;
  baseHeaderDetails:any;
  flag: any = {};
  constructor(private route: ActivatedRoute, private ocsService:OcsService) {
    this.route.params.subscribe((params: Params) => {
      this.licenseId = params['id'];
    });
   }

  ngOnInit() {
  }

  getBaseHeaderInfo(data){
    this.baseHeaderDetails = data;
  }

  loadTabComponent(event) {
    if (event.tab.textLabel == "Mapping Details") {
      this.flag.isMappedSoftwares = true;
    }
    if (event.tab.textLabel == "License Calculation") {
      this.flag.isLicenseCalculation = true;
    }
  }

}
