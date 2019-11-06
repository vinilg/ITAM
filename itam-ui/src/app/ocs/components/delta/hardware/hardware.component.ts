import { Component, OnInit, Output, EventEmitter, Input, TemplateRef } from '@angular/core';
import { OcsService } from './../../../ocs.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { SnackBarService } from '../../../../base/services/snack-bar.service';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delta-hardware',
  templateUrl: './hardware.component.html',
  styleUrls: ['./hardware.component.css', '../../../ocs.component.css']
})
export class HardwareComponent implements OnInit {
  allDeltaHardwareDetails: any = {};
  hardwareDetails: any = {};
  newDataDetails: any = [];
  newCiDatas : any = {};
  dataLoader: boolean = false;
  allSelectedExistingData: any = [];
  allSelectedNewCiData: any = [];
  hardwareDeltaDetails: any = {};
  selectAllNewCis:boolean;
  modalRef: BsModalRef;
  mergedSuccess:BsModalRef;
  errorMsg:any;
  updateDto:any = {
  existingChanges : [],
  newlyAddedCis : []
  };


  @Output() lastDeltaDate = new EventEmitter<any>();

  constructor(private ocsService: OcsService,
    private modalService: BsModalService, private snackBar: SnackBarService) {
  }

  ngOnInit() {
    this.getHardwareDetails();
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm', backdrop: true,
    ignoreBackdropClick: true});
  }

  confirm(template: TemplateRef<any>): void {
    var newCis = [];
    this.modalRef.hide();
    this.openModal(template);
    this.allSelectedNewCiData.forEach(data =>{
      newCis.push(data.hardwareDetails.id);
    })
    this.updateDto = {
      existingChanges:this.allSelectedExistingData,
      newlyAddedCis:newCis
    }
    this.ocsService.mergeHardwareChangedData(this.updateDto, resp=>{
      this.updateDelta();
      this.decline();
      this.snackBar.openSnackBar("Merged SuccessFully.", '','success-snackbar');
    },error=>{

    })
  }
 
  decline(): void {
    this.modalRef.hide();
  }

  updateDelta(){
    this.ocsService.deltaUpdate(resp=>{
      this.allSelectedExistingData = [];
      this.allSelectedNewCiData = [];
      this.getHardwareDetails();
    },err=>{

    })
  }

  getHardwareDetails() {
    this.newDataDetails = [];
    this.dataLoader = true;
    this.ocsService.getHardwareDeltaDetails(resp => {
      this.allDeltaHardwareDetails = resp.data;
      this.hardwareDetails = this.allDeltaHardwareDetails.existingChanges;
      this.newCiDatas = this.allDeltaHardwareDetails.newAddedData;
      Object.keys(this.newCiDatas).forEach(data=>{
        this.newDataDetails.push(this.newCiDatas[data]);
      })
      this.getLastDeltaDate(this.allDeltaHardwareDetails.lastDeltaDate)
      this.dataLoader = false;
    }, err => {
      this.dataLoader = false;
    })
  }

  getLastDeltaDate(date) {
    this.lastDeltaDate.emit(date);
  }

  onChange(event,index,data, accordionData){
    if(!event.checked){
      accordionData.value[index].isChecked = false;
      this.allSelectedExistingData.splice(this.allSelectedExistingData.indexOf(data), 1)
      accordionData.isChecked = false;
    }else{
      accordionData.value[index].isChecked = true;
      this.allSelectedExistingData.push(accordionData.value[index]);
      if(this.hasSubArray(this.allSelectedExistingData, accordionData.value)){
        accordionData.isChecked = true;
      }
    }
    console.log(this.allSelectedExistingData);
  }

//   hasSubArray(master, sub) {
//     return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
// }

hasSubArray(arr1, arr2){
  for (var i=0; i<arr2.length; i++){
    if ( arr1.indexOf( arr2[i] ) == -1 ){
      return false;
    }
  }
    return true;
}

  onSelectAll(event, allData){
    if(event.checked){
      allData.value.forEach(data =>{
        if(this.allSelectedExistingData.indexOf(data) == -1){
          data.isChecked = true;
          this.allSelectedExistingData.push(data); 
        }
      })
      allData.isChecked = true;
    }else {
      allData.value.forEach(data =>{
        data.isChecked = false;
        this.allSelectedExistingData.splice(this.allSelectedExistingData.indexOf(data), 1);
      })
      allData.isChecked = false;
    }
    console.log(this.allSelectedExistingData);
  }


  onNewCiChange(event,index,data){
    if(!event.checked){
      this.newDataDetails[index].isChecked = false;
      this.allSelectedNewCiData.splice(this.allSelectedNewCiData.indexOf(data), 1)
      this.selectAllNewCis = false;
    }else{
      this.newDataDetails[index].isChecked = true;
      this.allSelectedNewCiData.push(data);
      if(this.allSelectedNewCiData.length == this.newDataDetails.length){
        this.selectAllNewCis = true;
      }
    }
    console.log(this.allSelectedNewCiData);
  }

//   hasSubArray(master, sub) {
//     return sub.every((i => v => i = master.indexOf(v, i) + 1)(0));
// }

  onNewCiSelectAll(event, allData){
    if(event.checked){
      allData.forEach(data =>{
        if(this.allSelectedNewCiData.indexOf(data) == -1){
          data.isChecked = true;
          this.allSelectedNewCiData.push(data); 
        }
      })
      this.selectAllNewCis = true;
    }else {
      allData.forEach(data =>{
        data.isChecked = false;
        this.allSelectedNewCiData = [];
      })
      this.selectAllNewCis = false;
    }
    console.log(this.allSelectedNewCiData);
  }

}
