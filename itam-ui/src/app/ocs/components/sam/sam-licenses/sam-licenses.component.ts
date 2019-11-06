import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { OcsService } from '../../../ocs.service';
import { TableHeaderComponent } from '../../../../base/components/table-header/table-header.component';
import { ExportExcelService } from '../../../../base/services/export-excel.services';

@Component({
  selector: 'app-sam-licenses',
  templateUrl: './sam-licenses.component.html',
  styleUrls: ['./sam-licenses.component.css', '../../../ocs.component.css']
})
export class SamLicensesComponent implements OnInit {
  @ViewChild(TableHeaderComponent) tableHeader: TableHeaderComponent;
  softwareLicenseSummaryData: any = [];
  dataLoader: boolean;
  showSearchbox:boolean = true;
  filterCode: any;
  filterCode1: any;
  selectedFilter:any= '';
  selectedFilter1: any = '';
  isFilterCode:boolean;
  licenseFilterMasterData: any = {};
  licenseFilterObj: any = {
    selectedCapacityType: '',
    selectedVendor: '',
    selectedOem:'',
    selectedStatus:1,
    selectedCreationType:'Basic License'
  };
  export:boolean;
  isDowloading:boolean;
  softwareLicenseExportData:any = {};
  categoryWiseLicenseDataObj:any={};
  categoryWiseLicenseDataList:any=[];
  basicLicenseData:any=[];
  multiplePOLicenseData:any=[];
  maintenanceLicenseData:any=[];
  searchPostData: any = {
    'params': []
  };
  pagableInfo:any = {};
  noFilterSelect:boolean;

  constructor(private router: Router, private ocsService: OcsService, private route: ActivatedRoute, private exportExcel:ExportExcelService) {
    this.route.queryParamMap.subscribe((params: Params) => {
      if (params.params && (Object.keys(params.params).length == 1)) {
        this.filterCode = params.params['filterCode'];
        this.selectedFilter = this.filterCode;
        this.isFilterCode = true;
      } else if (params.params && (Object.keys(params.params).length > 1)) {
        this.filterCode = params.params['filterCode'];
        this.filterCode1 = params.params['filterCode1'];
        this.selectedFilter = this.filterCode;
        this.selectedFilter1 = this.filterCode1;
        this.isFilterCode = true;
      }
    });
  }

  ngOnInit() {
    this.dataLoader = true;
   this.getFilterMasterData();
  }

  getFilterMasterData() {
    this.ocsService.getSoftwareLicenseMasterData(resp => {
      this.licenseFilterMasterData = resp.data;
      this.getSearchPostData();
      this.generateLicenseList(false, this.searchPostData, false);
    }, error => { })
  }

  getSearchPostData() {
  if(this.licenseFilterObj.selectedCreationType != 1){
    this.searchPostData.params.push({ 'field': 'creationType', 'operation': 'EQUALITY', 'value': this.licenseFilterObj.selectedCreationType });
  }
  this.searchPostData.params.push({ 'field': 'status', 'operation': 'EQUALITY', 'value': this.licenseFilterObj.selectedStatus });
    // this.licenseFilterMasterData.vendors.forEach(data => {
    //   if (data.name == this.selectedFilter || data.name == this.selectedFilter1) {
    //     this.licenseFilterObj.selectedVendor = data.id;
    //     this.searchPostData.params.push({ 'field': 'vendor', 'operation': 'EQUALITY', 'value': data.id });
    //   }
    // })

    this.licenseFilterMasterData.oemMasters.forEach(data => {
      if (data.name == this.selectedFilter || data.name == this.selectedFilter1) {
        this.licenseFilterObj.selectedOem = data.id;
        this.searchPostData.params.push({ 'field': 'oem', 'operation': 'EQUALITY', 'value': data.id });
      }
    })

    this.licenseFilterMasterData.capacityTypes.forEach(data => {
      if (data.name == this.selectedFilter || data.name == this.selectedFilter1) {
        this.licenseFilterObj.selectedCapacityType = data.id;
        this.searchPostData.params.push({ 'field': 'licenseCapacityType', 'operation': 'EQUALITY', 'value': data.id });
      }
    })
  }

  downloadExcel(){
    this.export = true;
    this.isDowloading = true;
    if(!this.pagableInfo){
      this.generateLicenseList(this.pagableInfo, this.searchPostData, this.export);
    }else {
      this.generateLicenseList(false, this.searchPostData, this.export);
    }
  }
  generateLicenseList(pageInfo, searchParameters, exportData) {
    let assetListQueryString;
    if (pageInfo) {
      assetListQueryString = assetListQueryString ? assetListQueryString + "&" : "?";
      if (pageInfo.searchText) {
        assetListQueryString += "search=" + pageInfo.searchText + "&";
      }
      assetListQueryString += "page=" + pageInfo.number + "&size=" + pageInfo.size + "&sort=" + pageInfo.sort;
    }
    if(this.isFilterCode){
      if(assetListQueryString){
        assetListQueryString += "&filterCode=" + this.selectedFilter + "&export=" + exportData;
      }else
        assetListQueryString = "?filterCode=" + this.selectedFilter + "&page=0&size=50&sort=id,ASC" + "&export=" + exportData;
    }
    if(!this.export){
      this.doGetLicenseList(assetListQueryString ? assetListQueryString : "?page=0&size=50&sort=id,ASC"+"&export=" + exportData, searchParameters, pageInfo);
    }else{
      this.doGetLicenseExportData(assetListQueryString ? assetListQueryString : "?page=0&size=50&sort=id,ASC"+"&export=" + exportData, searchParameters, pageInfo);
    }
  }

  doGetLicenseList(queryString, searchParameters, pageInfo) {
    this.dataLoader = true;
    this.ocsService.postLicenseSummaryData(queryString, searchParameters, resp => {
      this.softwareLicenseSummaryData = resp.data;
      if (pageInfo) {
        this.softwareLicenseSummaryData.pagination.sort = pageInfo.sort;
      }
      this.tableHeader.configPagination(this.softwareLicenseSummaryData.pagination)
      this.dataLoader = false;
    }, error => {
      this.dataLoader = false;
    })
  }

  doGetLicenseExportData(queryString, searchParameters, pageInfo) {
    this.ocsService.postLicenseExportData(queryString, searchParameters, resp => {
      this.softwareLicenseExportData = resp.data;
      this.basicLicenseData = this.getLicenseExportDataBasedOnCategory(this.softwareLicenseExportData.baseLicense);
      this.multiplePOLicenseData = this.getLicenseExportDataBasedOnCategory(this.softwareLicenseExportData.multiplePoLicense);
      this.maintenanceLicenseData = this.getLicenseExportDataBasedOnCategory(this.softwareLicenseExportData.maintenanceLicense);
      this.exportExcel.exportAsExcelFile(this.basicLicenseData,this.multiplePOLicenseData, this.maintenanceLicenseData, "License Deatils")
      this.export = false;
      this.isDowloading = false;
    }, error => {
    })
  }

  getLicenseExportDataBasedOnCategory(licenseData){
    this.categoryWiseLicenseDataList = [];
    licenseData.forEach(data=>{
      this.categoryWiseLicenseDataObj = {};
      this.categoryWiseLicenseDataObj = {
        'License Name': data.name,
        'OEM': data.oem.name, 
        'Vendor':data.vendor.name, 
        'License Type' : data.licenseType, 
        'Capacity Type' : data.capacityTypeDto.name, 
        'License Count' : data.licenseCount,
        'Available Count': data.availableCount,
        'Active License Count':data.activeLicenseCount, 
        'Part Number':data.partNumber, 
        'PO Number': data.poNumber, 
        'PO Start Date': data.licenseStartDate, 
        'PO End Date': data.licenseEndDate,
        'Responsible Person':data.responsiblePerson  
      }
      this.categoryWiseLicenseDataList.push(this.categoryWiseLicenseDataObj);
    })
    return this.categoryWiseLicenseDataList;
  }
  //console.log(this.isFilterCode);
  onChangeFilter(pageInfo){
    console.log(this.isFilterCode)
    this.pagableInfo = pageInfo;
    this.generateLicenseList(pageInfo, this.searchPostData, false);
  }

  searchLicenses(formDatas){
    this.searchPostData.params = [];
    this.getSearchPostData();
    this.noFilterSelect = false;
    if (formDatas.value.type == '' && formDatas.value.vendor == '' && formDatas.value.oem == '', formDatas.value.status == '') {
      this.noFilterSelect = true;
      return;
    }
    this.dataLoader = true;
    // if(!this.export){
    //   this.searchPostData.params.push({ 'field': 'parent', 'operation': 'EQUALITY', 'value': 'baseLicense'});
    // }
    if (formDatas.value.type != '' && (formDatas.value.vendor == '' || formDatas.value.vendor == undefined) && (formDatas.value.oem == '' || formDatas.value.oem == undefined)) {
      this.searchPostData.params.push({ 'field': 'licenseCapacityType', 'operation': 'EQUALITY', 'value': formDatas.value.type });
    }else if ((formDatas.value.type == '' || formDatas.value.type == undefined) && (formDatas.value.oem == '' || formDatas.value.oem == undefined) && formDatas.value.vendor != '') {
      this.searchPostData.params.push({ 'field': 'vendor', 'operation': 'EQUALITY', 'value': formDatas.value.vendor });
    }else if ((formDatas.value.type == '' || formDatas.value.type == undefined) && formDatas.value.oem != '' && (formDatas.value.vendor == '' || formDatas.value.vendor == undefined)) {
      this.searchPostData.params.push({ 'field': 'oem', 'operation': 'EQUALITY', 'value': formDatas.value.oem });
    }else if(formDatas.value.type != '' && formDatas.value.vendor != '' && (formDatas.value.oem == '' || formDatas.value.oem == undefined)){
      this.searchPostData.params.push({ 'field': 'licenseCapacityType', 'operation': 'EQUALITY', 'value': formDatas.value.type },
      { 'field': 'vendor', 'operation': 'EQUALITY', 'value': formDatas.value.vendor })
    }else if(formDatas.value.type != '' && (formDatas.value.vendor == '' || formDatas.value.vendor == undefined) && formDatas.value.oem != ''){
      this.searchPostData.params.push({ 'field': 'licenseCapacityType', 'operation': 'EQUALITY', 'value': formDatas.value.type },
      { 'field': 'oem', 'operation': 'EQUALITY', 'value': formDatas.value.oem })
    }else if((formDatas.value.type == '' || formDatas.value.type == undefined)  && formDatas.value.vendor != '' && formDatas.value.oem != ''){
      this.searchPostData.params.push({ 'field': 'vendor', 'operation': 'EQUALITY', 'value': formDatas.value.vendor },
      { 'field': 'oem', 'operation': 'EQUALITY', 'value': formDatas.value.oem })
    }else if(formDatas.value.type == ''  && formDatas.value.vendor != '' && formDatas.value.oem != ''){
      this.searchPostData.params.push({ 'field': 'vendor', 'operation': 'EQUALITY', 'value': formDatas.value.vendor },
      { 'field': 'oem', 'operation': 'EQUALITY', 'value': formDatas.value.oem },
      { 'field': 'licenseCapacityType', 'operation': 'EQUALITY', 'value': formDatas.value.type })
    }
    this.generateLicenseList(false, this.searchPostData, false);
  }

  clearFilters() {
    this.searchPostData.params = [];
    this.licenseFilterObj = {
      selectedCapacityType: '',
      selectedVendor: '',
      selectedOem:'',
      selectedStatus:1,
      selectedCreationType:1
    };
    this.generateLicenseList(false, this.searchPostData, false);
  }

  showhideSearch() {
    this.showSearchbox = !this.showSearchbox;
  }
}
