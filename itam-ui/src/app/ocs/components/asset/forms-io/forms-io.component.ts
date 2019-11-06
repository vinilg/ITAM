import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-forms-io',
  templateUrl: './forms-io.component.html',
  styleUrls: ['./forms-io.component.css']
})
export class FormsIoComponent implements OnInit {
  @ViewChild('json') jsonElement?: ElementRef;
  public form: Object = {components: []};
  constructor() { }

  ngOnInit() {
  }

  onChange(event) {
    console.log(event.form);
  }

}
