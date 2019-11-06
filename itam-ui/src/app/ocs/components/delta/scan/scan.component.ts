import { Component, OnInit, TemplateRef } from '@angular/core';
import { OcsService } from '../../../ocs.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { SnackBarService } from '../../../../base/services/snack-bar.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.css','../../../ocs.component.css']
})
export class ScanComponent implements OnInit {
  sources:any = [];
  scanObj:any = {
    ciName: '',
    ipRange: '',
    selectedSource:"select"
  };
  paramValue:any = "";
  paramName:any = "";
  scanResult:any;
  scanRef: BsModalRef;
  selectAtLeastOne:boolean;
  constructor(private ocsService: OcsService,private snackBar: SnackBarService) {
   }

  ngOnInit() {
    this.ocsService.getSources(resp => {
      this.sources = resp.data;
  },error =>{})
}

scanNow(obj){
  if(obj.ciName == '' && obj.ipRange == '' && obj.selectedSource == 'select'){
    this.selectAtLeastOne = true;
    return;
  }
  if(obj.ciName != ''){
    this.paramName = "CI Name";
    this.paramValue = obj.ciName;
  }else if(obj.ipRange != ''){
    this.paramName = "IP Range";
    this.paramValue = obj.ipRange;
  }
  var params = {
    "sourceId" : obj.selectedSource,
    "paramName" : this.paramName,
    "paramValue" : this.paramValue,
    "status" : "Submitted"
  }

  this.ocsService.scanNow(params, resp =>{
    this.scanResult = resp.data;
    this.snackBar.openSnackBar("Your Request Submitted Successfully.Delta Will Be Updated Soon..", '', 'success-snackbar')
    this.scanObj = {
      ciName: '',
      ipRange: '',
      selectedSource:"select"
    };
  },error=>{
    this.snackBar.openSnackBar('Same Request Already Submitted By Other User.Wait For Some Time To Get Updated Delta.','', 'error-snackbar');
  })
}
}
