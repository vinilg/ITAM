import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-software-suite-dialog',
  templateUrl: './software-suite-dialog.component.html',
  styleUrls: ['./software-suite-dialog.component.css', '../../../../ocs.component.css']
})
export class SoftwareSuiteDialogComponent implements OnInit {
  suiteComponents:any =[];
  constructor(public dialogRef: MatDialogRef<SoftwareSuiteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }
  ngOnInit() {
    this.suiteComponents = this.data;
  }

}
