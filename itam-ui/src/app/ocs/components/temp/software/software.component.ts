import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OcsService } from './../../../ocs.service';
import { TableHeaderComponent } from '../../../../base/components/table-header/table-header.component';

@Component({
  selector: 'app-temp-ocs-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css','../../../ocs.component.css']
})
export class TempSoftwareComponent implements OnInit {
  @ViewChild(TableHeaderComponent) tableHeader: TableHeaderComponent;
  assetId: any;
  softwareObj: any = {};
  softwareDetails:any = [];
  dataLoader:boolean;
  showSearchbox:boolean;

  constructor(private route: ActivatedRoute, private ocsService: OcsService) {
    this.route.params.subscribe((params: Params) => {
      this.assetId = params['id'];
    });
  }
  
  ngOnInit() {
    this.dataLoader = true;
    this.generateSoftwareList(false);
  }

  onChangePagination(pageInfo){
    this.generateSoftwareList(pageInfo);
  }

  generateSoftwareList(pageInfo){
    let softwareListQueryString;
    if (pageInfo) {
      softwareListQueryString = softwareListQueryString ? softwareListQueryString + "&": "?";
      if (pageInfo.searchText) {
        softwareListQueryString += "search=" + pageInfo.searchText + "&";
      }
      softwareListQueryString += "page=" + pageInfo.number + "&size=" + pageInfo.size;
  }
  this.doGetSoftwareList(softwareListQueryString ? softwareListQueryString+ "&page=0&size=50" : "?page=0&size=50");
  }

  doGetSoftwareList(queryString){
    this.dataLoader = true;
    this.ocsService.getTempSoftwareDetails(this.assetId, queryString,resp => {
      this.softwareObj = resp.data;
      this.dataLoader = false;
      this.softwareDetails = this.softwareObj.softwareDetails;
      this.tableHeader.configPagination(this.softwareObj.pagination);
    }, err => {
    })
  }

  showhideSearch(){
    this.showSearchbox  = !this.showSearchbox;
  }

}
