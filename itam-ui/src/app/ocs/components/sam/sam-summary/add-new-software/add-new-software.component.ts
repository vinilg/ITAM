import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-new-software',
  templateUrl: './add-new-software.component.html',
  styleUrls: ['./add-new-software.component.css', '../../../../ocs.component.css']
})
export class AddNewSoftwareComponent implements OnInit {
  dataLoader: boolean;
  softwareDetails: any = {};
  suiteSoftwareList:any=[{"id": 1, "name":'Office'},{"id": 2, "name":'Win Software'},{"id": 3, "name":'Windows Server'},{"id": 4, "name":'XBox'}]
  selectedSoftwareForSuite:any=[]
  constructor(private route:Router) { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  onAddSoftware(data){
    console.log(data);
    console.log(this.selectedSoftwareForSuite);
  }


  onChange(item) {
    item.isSuiteChecked = !item.isSuiteChecked;
    console.log(item.isSuiteChecked);
  }

  onClickCancel(){
    this.route.navigate(['/ocs/sam'], {}); 
  }

}
