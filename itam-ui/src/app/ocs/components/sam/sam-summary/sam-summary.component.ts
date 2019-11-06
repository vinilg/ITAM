import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MatDialog } from '@angular/material';
import { SoftwareSuiteDialogComponent } from './software-suite-dialog/software-suite-dialog.component';
import { OcsService } from '../../../ocs.service';
import { TableHeaderComponent } from '../../../../base/components/table-header/table-header.component';
import { DEFAULT_RESIZE_TIME } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-sam-summary',
  templateUrl: './sam-summary.component.html',
  styleUrls: ['./sam-summary.component.css', '../../../ocs.component.css']
})
export class SamSummaryComponent implements OnInit {
  @ViewChild(TableHeaderComponent) tableHeader: TableHeaderComponent;
  dataLoader: boolean;
  showSearchbox: boolean = true;
  softwareSummaryData: any = [];
  softwareSuiteDetails: any = [];
  suiteDialogComponentData: any = [];
  softwareMasterData: any = {};
  filterCode: any;
  filterCode1: any;
  selectedFilter: any = '';
  selectedFilter1: any = '';
  searchPostData: any = {
    'params': []
  };
  softwareComplianceTypes = ['Complaint','Under Used', 'Over Used', 'Not Available'];
  softwareFilterObj: any = {
    selectedCategory: '',
    selectedType: '',
    selectedManufacture: ''
  };
  noFilterSelect:boolean;
  pagableInfo:any = {};

  constructor(private router: Router, public dialog: MatDialog, private ocsService: OcsService, private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe((params: Params) => {
      if (params.params && (Object.keys(params.params).length == 1)) {
        this.filterCode = params.params['filterCode'];
        this.selectedFilter = this.filterCode;
      } else if (params.params && (Object.keys(params.params).length > 1)) {
        this.filterCode = params.params['filterCode'];
        this.filterCode1 = params.params['filterCode1'];
        this.selectedFilter = this.filterCode;
        this.selectedFilter1 = this.filterCode1;
      }
    });
  }

  ngOnInit() {
    this.dataLoader = true;
    this.getFilterMasterData();
  }

  getFilterMasterData() {
    this.ocsService.getSoftwareFilterMasterData(resp => {
      this.softwareMasterData = resp.data;
      this.getSearchPostData();
      this.generateSoftwareList(false, this.searchPostData, false);
    }, error => { })
  }

  generateSoftwareList(pageInfo, searchParameters, exportData) {
    let assetListQueryString;
    if (pageInfo) {
      assetListQueryString = assetListQueryString ? assetListQueryString + "&" : "?";
      if (pageInfo.searchText) {
        assetListQueryString += "search=" + pageInfo.searchText + "&";
      }
      assetListQueryString += "page=" + pageInfo.number + "&size=" + pageInfo.size + "&sort=" + pageInfo.sort;
    }
    this.doGetSoftwareList(assetListQueryString ? assetListQueryString : "?page=0&size=50&sort=id,ASC", searchParameters, pageInfo);
  }


  doGetSoftwareList(queryString, searchParameters, pageInfo) {
    this.dataLoader = true;
    this.ocsService.postSoftwareSummaryData(queryString, searchParameters, resp => {
      this.softwareSummaryData = resp.data;
      if (pageInfo) {
        this.softwareSummaryData.pagination.sort = pageInfo.sort;
      }
      this.tableHeader.configPagination(this.softwareSummaryData.pagination)
      this.dataLoader = false;
    }, error => {
      this.dataLoader = false;
    })
  }

  getSearchPostData() {
    this.softwareMasterData.softwareCategories.forEach(data => {
      if (data.name == this.selectedFilter || data.name == this.selectedFilter1) {
        this.softwareFilterObj.selectedCategory = data.id;
        this.searchPostData.params.push({ 'field': 'category', 'operation': 'EQUALITY', 'value': data.id });
      }
    })

    this.softwareMasterData.softwareTypes.forEach(data => {
      if (data.name == this.selectedFilter || data.name == this.selectedFilter1) {
        this.softwareFilterObj.selectedType = data.id;
        this.searchPostData.params.push({ 'field': 'type', 'operation': 'EQUALITY', 'value': data.id });
      }
    })

    this.softwareMasterData.manufacturer.forEach(data => {
      if (data.name == this.selectedFilter || data.name == this.selectedFilter1) {
        this.softwareFilterObj.selectedManufacture = data.id;
        this.searchPostData.params.push({ 'field': 'manufacturer', 'operation': 'EQUALITY', 'value': data.id });
      }
    })

    this.softwareComplianceTypes.forEach(data => {
      if (data == this.selectedFilter || data == this.selectedFilter1) {
        this.searchPostData.params.push({ 'field': 'complianceType', 'operation': 'EQUALITY', 'value': data});
      }
    })
  }

  onChangeFilter(pageInfo){
    this.pagableInfo = pageInfo;
    this.generateSoftwareList(pageInfo, this.searchPostData, false);
  }

  searchSoftwares(formDatas){
    this.searchPostData.params = [];
    this.getSearchPostData();
    this.noFilterSelect = false;
    if (formDatas.value.type == '' && formDatas.value.category == '' && formDatas.value.manufacturer == '') {
      this.noFilterSelect = true;
      return;
    }
    this.dataLoader = true;
    if (formDatas.value.type != '' && (formDatas.value.category == '' || formDatas.value.category == undefined) && (formDatas.value.manufacturer == '' || formDatas.value.manufacturer == undefined)) {
      this.searchPostData.params.push({ 'field': 'type', 'operation': 'EQUALITY', 'value': formDatas.value.type });
    } else if ((formDatas.value.type == '' || formDatas.value.type == undefined) && formDatas.value.category != '' && (formDatas.value.manufacturer == '' || formDatas.value.manufacturer == undefined)) {
      this.searchPostData.params.push({ 'field': 'category', 'operation': 'EQUALITY', 'value': formDatas.value.category });
    } else if((formDatas.value.type == '' || formDatas.value.type == undefined) && formDatas.value.manufacturer != '' && (formDatas.value.category == '' || formDatas.value.category == undefined)){
      this.searchPostData.params.push({ 'field': 'manufacturer', 'operation': 'EQUALITY', 'value': formDatas.value.manufacturer });
     } else if (formDatas.value.type != '' && formDatas.value.category != '' && (formDatas.value.manufacturer == '' || formDatas.value.manufacturer == undefined)) {
      this.searchPostData.params.push({ 'field': 'category', 'operation': 'EQUALITY', 'value': formDatas.value.category },
        { 'field': 'type', 'operation': 'EQUALITY', 'value': formDatas.value.type });
    }else if(formDatas.value.type != '' && formDatas.value.manufacturer != '' && (formDatas.value.category == '' || formDatas.value.category == undefined)){
      this.searchPostData.params.push({ 'field': 'manufacturer', 'operation': 'EQUALITY', 'value': formDatas.value.manufacturer },
      { 'field': 'type', 'operation': 'EQUALITY', 'value': formDatas.value.type }); 
    }else if(formDatas.value.category != '' && formDatas.value.manufacturer != '' && (formDatas.value.type == '' || formDatas.value.type == undefined)){
      this.searchPostData.params.push({ 'field': 'manufacturer', 'operation': 'EQUALITY', 'value': formDatas.value.manufacturer },
      { 'field': 'category', 'operation': 'EQUALITY', 'value': formDatas.value.category }); 
    }else if(formDatas.value.category != '' && formDatas.value.manufacturer != '' && formDatas.value.type != ''){
      this.searchPostData.params.push({ 'field': 'manufacturer', 'operation': 'EQUALITY', 'value': formDatas.value.manufacturer },
      { 'field': 'category', 'operation': 'EQUALITY', 'value': formDatas.value.category },
      { 'field': 'type', 'operation': 'EQUALITY', 'value': formDatas.value.type }); 
    }
    this.generateSoftwareList(false, this.searchPostData, false);
  }

  clearFilters() {
    this.searchPostData.params = [];
    this.softwareFilterObj = {
      selectedCategory: '',
      selectedType: '',
      selectedManufacture: ''
    };
    this.generateSoftwareList(false, this.searchPostData, false);
  }

  openDialog(data): void {
    this.suiteDialogComponentData = [];
    for (let i = 0; i < this.softwareSummaryData.length; i++) {
      if (this.softwareSummaryData[i].basicSoftwareDetails.id == data) {
        this.softwareSuiteDetails = this.softwareSummaryData[i].softwareSuiteComponent;
        break;
      }
    }

    this.softwareSuiteDetails.forEach(data => {
      this.suiteDialogComponentData.push({
        "name": data.name,
        "version": data.version
      })
    })
    const dialogRef = this.dialog.open(SoftwareSuiteDialogComponent, {
      width: '600px',
      data: this.suiteDialogComponentData
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  showhideSearch() {
    this.showSearchbox = !this.showSearchbox;
  }

  onClickSoftwareAdd() {
    this.router.navigate(['/ocs/sam/add'], {});
  }

}
