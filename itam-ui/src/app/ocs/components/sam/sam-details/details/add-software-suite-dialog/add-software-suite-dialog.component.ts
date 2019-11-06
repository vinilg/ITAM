import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-add-software-suite-dialog',
  templateUrl: './add-software-suite-dialog.component.html',
  styleUrls: ['./add-software-suite-dialog.component.css','../../../../../ocs.component.css']
})
export class AddSoftwareSuiteDialogComponent implements OnInit {
  suiteSoftwareList:any=[{"id": 1, "name":'Microsoft Access'},{"id": 2, "name":'Microsoft Excel'}]
  selectedSoftwareForSuite:any=[{"id": 3, "name":'Microsoft Word'},{"id": 4, "name":'Microsoft Powerpoint'}, {"id": 4, "name":'Microsoft Outlook'}]
  constructor(public dialogRef: MatDialogRef<AddSoftwareSuiteDialogComponent>) { }

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
