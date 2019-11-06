import { Component, OnInit } from '@angular/core';
import { OcsService } from '../../../../ocs.service';
import { SnackBarService } from '../../../../../base/services/snack-bar.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-add-new-license',
  templateUrl: './add-new-license.component.html',
  styleUrls: ['./add-new-license.component.css', '../../../../ocs.component.css']
})
export class AddNewLicenseComponent implements OnInit {
  dataLoader:boolean;
  creationType = ['Basic License', 'Multiple PO License', 'Maintenance License'];
  licenseType= ['Perpetual', 'Subscription']
  licenseDetails:any={
    "creationType": "Basic License",
    "status":1
  };
  allLicense:any=[];
  licenseMasterData:any={};
  isEdit:boolean;
  licenseId:any;
  constructor(private ocsService : OcsService, private snackBar:SnackBarService, private route: ActivatedRoute, private router:Router) {
    if (this.router.url.indexOf('/edit') > -1) {
      this.isEdit = true;
      this.route.params.subscribe((params: Params) => {
        this.licenseId = params['id'];
      });
    }
   }

  ngOnInit() {
    this.dataLoader = true;
      this.getLicenseMasterDetails();
  }

  getLicenseMasterDetails(){
    this.ocsService.getAllLicense(resp=>{
      this.allLicense = resp.data;
      this.ocsService.getSoftwareLicenseMasterData(resp=>{
        this.licenseMasterData = resp.data;
        if(this.isEdit){
          this.getLicenseEditDetails();
        }
        this.dataLoader = false;
      }, error=>{})
    }, error=>{})
  }

  getLicenseEditDetails(){
    this.dataLoader = true;
    this.ocsService.editSelectedLicense(this.licenseId, resp=>{
      this.licenseDetails = resp.data;
      this.dataLoader = false;
    }, error=>{})
  }

  onAddUpdateLicense(data){
    this.dataLoader = true;
    if(this.isEdit){
      this.updateLicense(data);
    }else {
      this.addNewLicense(data);
    }
  }

  addNewLicense(data){
    this.ocsService.postAddNewLicense(data, resp=>{
      if(resp.responseCode == 0){
        this.dataLoader = false;
        this.licenseDetails = {};
        this.snackBar.openSnackBar('License Added SuccessFully', '','success-snackbar');
        this.getLicenseMasterDetails();
      }
    }, error=>{
      this.dataLoader = false;
      this.snackBar.openSnackBar('Error While Adding License' + error, '','error-snackbar');
    })
  }

  updateLicense(data){
    this.ocsService.updateLicenseDetails(this.licenseId, data, resp=>{
      if(resp.responseCode == 0){
        this.dataLoader = false;
        this.snackBar.openSnackBar('License Edited SuccessFully', '','success-snackbar');
        this.router.navigate(['ocs/sam/license-details/', this.licenseId])
      }
    }, error=>{
      this.dataLoader = false;
      this.snackBar.openSnackBar('Error While Editing License' + error, '','error-snackbar');
    })
  }
}
