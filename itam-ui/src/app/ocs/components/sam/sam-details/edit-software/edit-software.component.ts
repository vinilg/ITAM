import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-edit-software',
  templateUrl: './edit-software.component.html',
  styleUrls: ['./edit-software.component.css','../../../../ocs.component.css']
})
export class EditSoftwareComponent implements OnInit {
  suiteSoftwareList:any=[{"id": 1, "name":'Office'},{"id": 2, "name":'Win Software'},{"id": 3, "name":'Windows Server'},{"id": 4, "name":'XBox'}]
  selectedSoftwareForSuite:any=[]
  constructor() { }

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


}
