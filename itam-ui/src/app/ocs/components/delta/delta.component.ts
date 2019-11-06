import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { OcsService } from './../../ocs.service';

@Component({
  selector: 'app-delta',
  templateUrl: './delta.component.html',
  styleUrls: ['./delta.component.css','../../ocs.component.css']
})
export class DeltaComponent implements OnInit {
  modalRef: BsModalRef;
  updatemodalRef: BsModalRef;
  message: string;
  allDeltaHardwareDetails:any={}
  lastDeltaDate:any;
  showSoftware:boolean;
  showScanNow:boolean;
  updateDeltaValue:any;
  constructor(private modalService: BsModalService, private ocsService:OcsService) { }

  ngOnInit() {

  }

  // openModall(template: TemplateRef<any>) {
  //   this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  // }

  // updateModel(updateTemplate: TemplateRef<any>) {
  //   this.updatemodalRef = this.modalService.show(updateTemplate, {class: 'modal-sm'});
  // }
 
  // confirm(): void {
  //   this.message = 'Confirmed!';
  //   this.modalRef.hide();
  // }
 
  // decline(): void {
  //   this.message = 'Declined!';
  //   this.modalRef.hide();
  // }

  getDeltaDate(date:any) {
    this.lastDeltaDate =date;
  }

  // updateDelta(){
  //   this.updateDeltaValue = null;
  //   this.ocsService.deltaUpdate(resp=>{
  //     this.updateDeltaValue = resp.message;
  //   },err=>{

  //   })
  // }

  getSelectedTab(event){
    if(event.tab.textLabel == "Software"){
      this.showSoftware = true;
    }
    if(event.tab.textLabel == "Scan Now"){
      this.showScanNow = true;
    }
  }

}
