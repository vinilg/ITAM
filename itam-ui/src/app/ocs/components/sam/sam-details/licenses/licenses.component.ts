import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OcsService } from '../../../../ocs.service';

@Component({
  selector: 'app-licenses',
  templateUrl: './licenses.component.html',
  styleUrls: ['./licenses.component.css','../../../../ocs.component.css']
})
export class LicensesComponent implements OnInit {
  dataLoader:boolean;
  softwareId:any;
  selectedSoftwareLicenseInfo:any = [];
  constructor(private route: ActivatedRoute, private ocsService:OcsService) {
    this.route.params.subscribe((params: Params) => {
      this.softwareId = params['id'];
    });
   }

  ngOnInit() {
   this.getLicenseInfo();
  }

  getLicenseInfo(){
    this.dataLoader = true;
    this.ocsService.getLicenseDetailsForSelectedSoftware(this.softwareId, resp=>{
      this.selectedSoftwareLicenseInfo = resp.data;
      this.dataLoader = false;
    }, error=>{})
  }
}
