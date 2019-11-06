import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OcsService } from '../../../ocs.service';

@Component({
  selector: 'app-sam-details',
  templateUrl: './sam-details.component.html',
  styleUrls: ['./sam-details.component.css', '../../../ocs.component.css']
})
export class SamDetailsComponent implements OnInit {
  isEdit:boolean;
  flag: any = {
    "softwareInfo" : true
  };
  softwareBasicDetails:any = [];
  selectedSoftwareDetails:any;
  softwareId: any;
  baseHeaderDetails:any = {};
  constructor(private route: ActivatedRoute, private ocsService:OcsService) {
    this.route.params.subscribe((params: Params) => {
      this.softwareId = params['id'];
    });
  }

  ngOnInit() {
  }

  loadTabComponent(event) {
    if (event.tab.textLabel == "Software Details") {
      this.flag.softwareInfo = true;
      this.flag.licenseTab = false;
      this.flag.installationTab = false;
    }
    if (event.tab.textLabel == "License") {
      this.flag.licenseTab = true;
      this.flag.softwareInfo = false;
      this.flag.installationTab = false;
    }
    if (event.tab.textLabel == "Installations") {
      this.flag.installationTab = true;
      this.flag.licenseTab = false;
      this.flag.softwareInfo = false;
    }
  }

  getBaseHeaderInfo(data){
    this.baseHeaderDetails = data;
  }

  onClickSoftwareEdit(){
    this.isEdit = true;
  }
}
