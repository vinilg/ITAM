import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddSoftwareSuiteDialogComponent } from './add-software-suite-dialog/add-software-suite-dialog.component';
import { ActivatedRoute, Params } from '@angular/router';
import { OcsService } from '../../../../ocs.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css','../../../../ocs.component.css']
})
export class DetailsComponent implements OnInit {
  @Output() baseHeaderInfo = new EventEmitter<any>();
  softwareId:any;
  softwareBasicDetails:any;
  dataLoader:boolean;
  excludedAssetsCount:any = 0;
  isSuite:boolean;

  constructor(public dialog: MatDialog, private route: ActivatedRoute, private ocsService:OcsService) { 
    this.route.params.subscribe((params: Params) => {
      this.softwareId = params['id'];
    });
  }

  ngOnInit() {
    this.dataLoader = true;
    this.ocsService.getSoftwareBasicDetails(this.softwareId,resp=>{
      this.softwareBasicDetails = resp.data;
      this.getBaseHeaderInfo(this.softwareBasicDetails);
      if(this.softwareBasicDetails.isSoftwareSuite != 0){
        this.isSuite = true;
      }
      this.excludedAssetsCount = this.softwareBasicDetails.installedCount -  this.softwareBasicDetails.licensedInstallationCount;
      this.dataLoader = false;
    }, error=>{})
  }

  onClickSoftwareSuiteAdd(){
      const dialogRef = this.dialog.open(AddSoftwareSuiteDialogComponent, {
        width: '700px',
        data: {name: 'Vinil', animal: 'abc'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        //this.animal = result;
      });
  }

  getBaseHeaderInfo(basicDetails){
    this.baseHeaderInfo.emit({
      "softwareName" : basicDetails.name,
      "manufacturer" : basicDetails.manufacturer.name,
      "type": basicDetails.softwareType.name,
      "category" : basicDetails.softwareCategory.name,
      "compliance" : basicDetails.complianceType 
    })
  }



}
