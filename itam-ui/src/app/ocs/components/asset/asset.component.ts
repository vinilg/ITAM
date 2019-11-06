import { Component, OnInit, ViewChild } from '@angular/core';
import { OcsService } from './../../ocs.service';
import { TableHeaderComponent } from '../../../base/components/table-header/table-header.component';
import { MatTableDataSource, MatPaginator, MatSort, PageEvent } from '@angular/material';
import { Router, Params, ActivatedRoute } from '@angular/router';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
import * as XLSX from 'ts-xlsx';
import { Subscriber, Observable } from 'rxjs';
import { SnackBarService } from '../../../base/services/snack-bar.service';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css', '../../ocs.component.css']
})
export class AssetComponent implements OnInit {
  @ViewChild(TableHeaderComponent) tableHeader: TableHeaderComponent;
  @ViewChild('updateFile') updateFile;
  allAssets: any = [];
  dataLoader: boolean = false;
  showSearchbox: boolean = true;
  availableStatus: any = [];
  availableCategories: any = [];
  allAssetFamily: any = [];
  availableOSData: any = ["Windows", "Linux", "Mac"];
  statusId: any;
  selectedFiles: any = {};
  categoryId: any;
  assetFamilyId: any;
  selectedOs: any;
  filterCode : any;
  filterCode1: any;
  statusMatch: boolean;
  categoryMatch: boolean;
  familyMatch: boolean;
  osMatch: boolean;
  selectedFilter : any = '';
  selectedFilter1: any = '';
  export: boolean;
  assetDataForExport: any = [];
  assetDataObj: any = {};
  arrayBuffer: any;
  importData: any = [];
  updateExcelData: any = [];
  postImportData: any = [];
  postImportObj: any = {};
  postUpdateData: any = [];
  postUpdateObj: any = {};
  postAttributeUpdateObj: any = {};
  postAttributeUpdateData: any = [];
  assetDataForExportInOrder: any = [];
  allLocations: any = [];
  allSites: any = [];
  assetSiteMaster : any = [];
  excelHeaders = ["System Name","Serial Number", "Category", "Asset Family", "Location", "Site", "Description", "Connected User", "Purchase Date", "Commissioned Date", "Decommissioned Date", "Support Start Date", "Support End Date", "Status", "Source"]
  uploadExcelHeader = ["Hostname","Serial Number","Category","Family","Status","IP Address","Owner Name","Manufacturer","Model Number","Location","Site","PO Number","Entity","Purchase Date","Warranty Start Date","Warranty Expiration Date","Asset Type","OS Name","OS Version","Logical CPUs","Cores","RAM Size","Maintenance Type","AMC Vendor","Rack Unit","Room Number","Rack Number"];
  updateExcelHeader = ["System Name","Serial Number","Status","Category","IP Address","Purchase PO Number","Maintenance PO Number","Entity","Priority","Common Name","Owner Name","Application Owner","Maintenance Type","AMC Vendor","Commissioned Ticket Number","Decommissioned Ticket Number","Commissioned Date","Decommissioned Date","Support Start Date","Support End Date","Location","Site","Rack Unit","Room Number","Rack Number","Server Type","Environment","Manufacturer","Model Number","Asset Type","OS Name","OS Version","Logical CPUs","Cores","RAM Size"];
  updateExcelToHeaderMapping = [{ "id": 516, "header": "OS Name" }, { "id": 517, "header": "OS Version" },
  { "id": 523, "header": "IP Address" }, { "id": 525, "header": "RAM Size" },
  { "id": 533, "header": "Cores" },{ "id": 538, "header": "Logical CPUs" }, { "id": 544, "header": "Manufacturer" }, { "id": 545, "header": "Model Number" },{ "id": 550, "header": "Asset Type" },
  { "id": 558, "header": "Purchase PO Number" }, { "id": 564, "header": "Maintenance PO Number" },
  { "id": 559, "header": "Entity" }, { "id": 560, "header": "Priority" },
  { "id": 566, "header": "Common Name" }, { "id": 567, "header": "Owner Name" },
  { "id": 568, "header": "Application Owner" }, { "id": 561, "header": "Maintenance Type" },
  { "id": 562, "header": "AMC Vendor" }, { "id": 563, "header": "Commissioned Ticket Number" },
  { "id": 565, "header": "Decommissioned Ticket Number" }, { "id": 571, "header": "Rack Unit" },
  { "id": 570, "header": "Room Number" }, { "id": 569, "header": "Rack Number" }, 
  { "id": 572, "header": "Server Type" },{ "id": 547, "header": "Environment" }]

  importExcelHeaderMapping = [{ "id": 516, "header": "OS Name" }, { "id": 517, "header": "OS Version" },
  { "id": 523, "header": "IP Address" }, { "id": 525, "header": "RAM Size" },
  { "id": 533, "header": "Cores" },{ "id": 538, "header": "Logical CPUs" }, 
  { "id": 544, "header": "Manufacturer" }, { "id": 545, "header": "Model Number" },
  { "id": 550, "header": "Asset Type" },{ "id": 558, "header": "Purchase PO Number" },
  { "id": 559, "header": "Entity" }, { "id": 567, "header": "Owner Name" },
  { "id": 562, "header": "AMC Vendor" }, { "id": 561, "header": "Maintenance Type" },
  { "id": 571, "header": "Rack Unit" },{ "id": 570, "header": "Room Number" }, { "id": 569, "header": "Rack Number" }]

  assetFilterObj: any = {
    selectedStatus: '',
    selectedCategory: '',
    selectedAssetFamily: '',
    selectedLocation:'',
    selectedSite:''
  }
  isDowloading: boolean;

  noFilterSelect: boolean;
  searchPostData: any = {
    'params': []
  };
  pagableInfo: any = {};

  constructor(private ocsService: OcsService, private route: ActivatedRoute, private snackBar: SnackBarService) {
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
  onChangeFilter(pageInfo) {
    this.pagableInfo = pageInfo;
    this.generateAssetList(pageInfo, this.searchPostData, false);
  }

  downloadExcel() {
    this.export = true;
    this.isDowloading = true;
    if (!this.pagableInfo) {
      this.generateAssetList(this.pagableInfo, this.searchPostData, this.export);
    } else {
      this.generateAssetList(false, this.searchPostData, this.export);
    }
  }

  generateAssetList(pageInfo, searchParameters, exportData) {
    let assetListQueryString;
    if (pageInfo) {
      assetListQueryString = assetListQueryString ? assetListQueryString + "&" : "?";
      if (pageInfo.searchText) {
        assetListQueryString += "search=" + pageInfo.searchText + "&";
      }
      assetListQueryString += "page=" + pageInfo.number + "&size=" + pageInfo.size + "&sort=" + pageInfo.sort + "&export=" + exportData;
    }

    if (!this.statusMatch && !this.osMatch && !this.categoryMatch && this.selectedFilter != null) {
      assetListQueryString = assetListQueryString ? assetListQueryString + "&" : "?";
      assetListQueryString += "filterCode=" + this.selectedFilter + "&page=0&size=50&sort=id,ASC" + "&export=" + exportData;
    }
    if (!exportData) {
      this.doGetAssetList(assetListQueryString ? assetListQueryString : "?page=0&size=50&sort=id,ASC" + "&export=" + exportData, searchParameters, pageInfo);
    } else {
      this.doGetExportAssetList(assetListQueryString ? assetListQueryString : "?page=0&size=50&sort=id,ASC" + "&export=" + exportData, searchParameters, pageInfo);
    }
  }

  doGetAssetList(queryString, searchParameters, pageInfo) {
    this.dataLoader = true;
    this.ocsService.postAllAssets(queryString, searchParameters, resp => {
      this.allAssets = resp.data;
      if (pageInfo) {
        this.allAssets.pagination.sort = pageInfo.sort;
      }
      this.tableHeader.configPagination(this.allAssets.pagination)
      this.dataLoader = false;
    }, err => {
      this.dataLoader = false;
    })
  }

  doGetExportAssetList(queryString, searchParameters, pageInfo) {
    this.assetDataForExportInOrder = [];
    this.ocsService.postAllAssets(queryString, searchParameters, resp => {
      this.assetDataForExport = resp.data;
      this.assetDataForExport.assetData.forEach(data => {
        this.assetDataObj = {};
        this.assetDataObj = {
          "System Name": data.hardwareName,
          "Serial Number": data.serialNumber,
          "Category": data.assetCategory.name,
          "Asset Family": data.assetFamily,
          "Location": data.location?data.location.name:'NA',
          "Site": data.site?data.site.name:'NA',
          "Description": data.description,
          "Connected User": data.connectedUser,
          "Purchase Date": data.purchaseDate,
          "Commissioned Date": data.commissionedDate,
          "DeCommissioned Date": data.deCommissionedDate,
          "Support Start Date": data.supportStartDate,
          "Support End Date": data.supportEndDate,
          "Status": data.assetStatus.name,
          "Source": data.sourceName
        };
        this.assetDataForExportInOrder.push(this.assetDataObj);
      });
      var options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true,
        useBom: true,
        headers: this.excelHeaders,
        nullToEmptyString: true,
      };
      new Angular5Csv(this.assetDataForExportInOrder, 'ITAM_ASSETS', options);
      this.isDowloading = false;
    }, err => {
      this.isDowloading = false;
    })
  }

  showhideSearch() {
    this.showSearchbox = !this.showSearchbox;
  }

  getFilterMasterData() {
    this.ocsService.getFilterMasterData(resp => {
      this.availableStatus = resp.data.allAvailableStatus;
      this.availableCategories = resp.data.allAvaiableCategories;
      this.allAssetFamily = resp.data.allAssetFamily;
      this.assetSiteMaster = resp.data.allSites;
      this.allSites = this.assetSiteMaster;
      this.allLocations = resp.data.allLocations;
      this.getSearchPostData();
      // if (this.searchPostData.params.length > 0) {
      this.generateAssetList(false, this.searchPostData, false);
      // }
    }, error => { })
  }

  onChangeLocation(location){
    this.assetFilterObj.selectedSite = null;
    this.allSites = this.assetSiteMaster.filter(function (el) {
      return el.locationId == location
    })
  }

  getSearchPostData() {
    this.availableStatus.forEach(data => {
      if (data.name == this.selectedFilter || data.name == this.selectedFilter1) {
        this.statusMatch = true;
        this.statusId = data.id;
        this.assetFilterObj.selectedStatus = this.statusId;
      }
    })
    this.availableCategories.forEach(data => {
      if (data.name == this.selectedFilter || data.name == this.selectedFilter1) {
        this.categoryMatch = true;
        this.categoryId = data.id;
        this.assetFilterObj.selectedCategory = this.categoryId;
      }
    })

    this.availableOSData.forEach(data => {
      if (data == this.selectedFilter || data == this.selectedFilter1) {
        this.osMatch = true;
        this.selectedOs = data;
      }
    })

    this.allAssetFamily.forEach(data => {
      if (data.name == this.selectedFilter || data.name == this.selectedFilter1) {
        this.familyMatch = true;
        this.assetFamilyId = data.id;
        this.assetFilterObj.selectedAssetFamily = data.id;
      }
    })
    if (this.statusMatch) {
      this.searchPostData.params.push({ 'field': 'status', 'operation': 'EQUALITY', 'value': this.statusId });
    } else if (this.categoryMatch) {
      this.searchPostData.params.push({ 'field': 'category', 'operation': 'EQUALITY', 'value': this.categoryId });
    } else if (this.osMatch) {
      this.searchPostData.params.push({ 'field': 'attributeValue', 'operation': 'CONTAINS', 'value': this.selectedOs });
    } else if (this.familyMatch) {
      this.searchPostData.params.push({ 'field': 'assetFamily', 'operation': 'EQUALITY', 'value': this.assetFamilyId })
    }
  }

  searchAssets(formDatas) {
    this.searchPostData.params = [];
    this.getSearchPostData();
    this.noFilterSelect = false;
    if (formDatas.value.status == '' && formDatas.value.category == '' && formDatas.value.family == '' && formDatas.value.location == '' && formDatas.value.site == '') {
      this.noFilterSelect = true;
      return;
    }
    this.dataLoader = true;
    if(formDatas.value.status != '' && formDatas.value.status != undefined){
      this.searchPostData.params.push({ 'field': 'status', 'operation': 'EQUALITY', 'value': formDatas.value.status }); 
    }
    if(formDatas.value.family != '' && formDatas.value.family != undefined){
      this.searchPostData.params.push({ 'field': 'assetFamily', 'operation': 'EQUALITY', 'value': formDatas.value.family });
    }
    if(formDatas.value.category != '' && formDatas.value.category != undefined){
      this.searchPostData.params.push({ 'field': 'category', 'operation': 'EQUALITY', 'value': formDatas.value.category });
    }
    if(formDatas.value.location != '' && formDatas.value.location != undefined){
      this.searchPostData.params.push({ 'field': 'location', 'operation': 'EQUALITY', 'value': formDatas.value.location });
    }
    if(formDatas.value.site != '' && formDatas.value.site != undefined){
      this.searchPostData.params.push({ 'field': 'site', 'operation': 'EQUALITY', 'value': formDatas.value.site });
    }
    this.generateAssetList(false, this.searchPostData, false);

  }

  clearFilters() {
    this.searchPostData.params = [];
    //this.getSearchPostData();
    if (this.statusMatch && this.categoryMatch && this.familyMatch) {
      this.assetFilterObj = {
        selectedStatus: this.statusId,
        selectedCategory: this.categoryId,
        selectedAssetFamily: this.assetFamilyId
      }
    } else if (this.statusMatch && !this.categoryMatch && !this.familyMatch) {
      this.assetFilterObj = {
        selectedStatus: this.statusId,
        selectedCategory: '',
        selectedAssetFamily: ''
      }
    } else if (!this.statusMatch && this.categoryMatch && !this.familyMatch) {
      this.assetFilterObj = {
        selectedStatus: '',
        selectedCategory: this.categoryId,
        selectedAssetFamily: ''
      }
    } else if (!this.statusMatch && !this.categoryMatch && this.familyMatch) {
      this.assetFilterObj = {
        selectedStatus: '',
        selectedCategory: '',
        selectedAssetFamily: this.assetFamilyId
      }
    } else {
      this.assetFilterObj = {
        selectedStatus: '',
        selectedCategory: '',
        selectedAssetFamily: ''
      };
    }
    this.getFilterMasterData();
    //this.generateAssetList(false, this.searchPostData, false);
  }

  uploadFile(event) {
    this.dataLoader = true;
    this.postImportData = [];
    this.selectedFiles = event.target.files;
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.selectedFiles.item(0));
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.importData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      let importDataHeader = this.get_header_row(worksheet);
      if (importDataHeader.length === this.uploadExcelHeader.length && this.uploadExcelHeader.every((value, index) => value === importDataHeader[index])) {
        this.importData.forEach(data => {
          let siteId = null;
          let statusId = null;
          let categoryId = null;
          let locationId = null;
          if (data.hasOwnProperty('Category')) {
            this.availableCategories.forEach(category => {
              if (category.name == data['Category']) {
                categoryId = category.id;
              }
            })
          }
          if (data.hasOwnProperty('Status')) {
            this.availableStatus.forEach(status => {
              if (status.name == data['Status']) {
                statusId = status.id;
              }
            })
          }
          if (data.hasOwnProperty('Site')) {
            for (let i = 0; i < this.allSites.length; i++) {
              if (this.allSites[i].name == data['Site']) {
                siteId = this.allSites[i].id;
                locationId = this.allSites[i].locationId;
                break;
              }
            }
          }
          this.postImportObj = {};
          this.postAttributeUpdateData = [];
          this.updateExcelToHeaderMapping.forEach(attribute => {
            this.postAttributeUpdateObj = {};
            this.postAttributeUpdateObj = {
              "attrbuteId": attribute.id,
              "attributeValue": data.hasOwnProperty(attribute.header) ? data[attribute.header] : null
            }
            this.postAttributeUpdateData.push(this.postAttributeUpdateObj);
          })
          this.postImportObj = {
            "systemName": data.hasOwnProperty('Hostname') ? data['Hostname'] : null,
            "serialNumber": data.hasOwnProperty('Serial Number') ? data['Serial Number'] : null,
            "category": categoryId,
            "location": locationId,
            "site": siteId,
            "status":statusId,
            "poNumber": data.hasOwnProperty('PO Number') ? this.excelDateToJSDate(data['PO Number']) : null,
            "purchaseDate": data.hasOwnProperty('Purchase Date') ? this.excelDateToJSDate(data['Purchase Date']) : null,
            "warrantyStartDate": data.hasOwnProperty('Warranty Start Date') ? this.excelDateToJSDate(data['Warranty Start Date']) : null,
            "warrantyEndDate": data.hasOwnProperty('Warranty Expiration Date') ? this.excelDateToJSDate(data['Warranty Expiration Date']) : null,
            "source": "External",
            "attributes": this.postAttributeUpdateData
          }
          this.postImportData.push(this.postImportObj);
        })
        this.ocsService.importInStockAssets(this.postImportData, resp => {
          if (resp.responseCode == 0) {
            this.getFilterMasterData();
            this.dataLoader = false;
            this.snackBar.openSnackBar('Asset Uploaded SuccessFully', '', 'success-snackbar');
          }
        }, error => {
          this.dataLoader = false;
          this.snackBar.openSnackBar('Error While Uploading Assets', '', 'error-snackbar');
        })
      } else {
        this.dataLoader = false;
        this.snackBar.openSnackBar('Please Upload Valide Excel', '', 'error-snackbar');
      }
    }

  }

  bulkUpdate(event) {
    this.dataLoader = true;
    this.postUpdateData = [];
    this.selectedFiles = event.target.files;
    let fileReader = new FileReader();
    fileReader.readAsArrayBuffer(this.selectedFiles.item(0));
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.updateExcelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      let updateExcelDataHeader = this.get_header_row(worksheet)
      if (updateExcelDataHeader.length === this.updateExcelHeader.length && this.updateExcelHeader.every((value, index) => value === updateExcelDataHeader[index])) {
        this.updateExcelData.forEach(excelData => {
          let siteId = null;
          let locationId = null;
          let statusId = null;
          let categoryId = null;
          if (excelData.hasOwnProperty('Status')) {
            this.availableStatus.forEach(status => {
              if (status.name == excelData['Status']) {
                statusId = status.id;
              }
            })
          }

          if (excelData.hasOwnProperty('Category')) {
            this.availableCategories.forEach(category => {
              if (category.name == excelData['Category']) {
                categoryId = category.id;
              }
            })
          }
          if (excelData.hasOwnProperty('Site')) {
            for (let i = 0; i < this.allSites.length; i++) {
              if (this.allSites[i].name == excelData['Site']) {
                siteId = this.allSites[i].id;
                locationId = this.allSites[i].locationId;
                break;
              }
            }
          }
          this.postUpdateObj = {};
          this.postAttributeUpdateData = [];
          this.updateExcelToHeaderMapping.forEach(attribute => {
            this.postAttributeUpdateObj = {};
            this.postAttributeUpdateObj = {
              "attrbuteId": attribute.id,
              "attributeValue": excelData.hasOwnProperty(attribute.header) ? excelData[attribute.header] : null
            }
            this.postAttributeUpdateData.push(this.postAttributeUpdateObj);
          })
          this.postUpdateObj = {
            "ciName": excelData.hasOwnProperty('System Name') ? excelData['System Name'] : null,
            "serialNumber": excelData.hasOwnProperty('Serial Number') ? excelData['Serial Number'] : null,
            "statusId": statusId,
            "categoryId":categoryId,
            "commissionedDate": excelData.hasOwnProperty('Commissioned Date') ? this.excelDateToJSDate(excelData['Commissioned Date']) : null,
            "deCommissionedDate": excelData.hasOwnProperty('Decommissioned Date') ? this.excelDateToJSDate(excelData['Decommissioned Date']) : null,
            "supportStartDate": excelData.hasOwnProperty('Support Start Date') ? this.excelDateToJSDate(excelData['Support Start Date']) : null,
            "supportEndDate": excelData.hasOwnProperty('Support End Date') ? this.excelDateToJSDate(excelData['Support End Date']) : null,
            "poNumber": excelData.hasOwnProperty('Purchase PO Number') ? excelData['Purchase PO Number'] : null,
            "ownerName":excelData.hasOwnProperty('Owner Name') ? excelData['Owner Name'] : null,
            "site": siteId,
            "location": locationId,
            "attributes": this.postAttributeUpdateData
          }
          this.postUpdateData.push(this.postUpdateObj);
          this.updateFile.nativeElement.value = '';
        })
        this.ocsService.bulkUpdateAssets(this.postUpdateData, resp => {
          if (resp.responseCode == 0) {
            this.getFilterMasterData();
            this.dataLoader = false;
            this.snackBar.openSnackBar('Assets Updated SuccessFully', '', 'success-snackbar');
          }
        }, error => {
          this.dataLoader = false;
          this.snackBar.openSnackBar('Error While Updating Assets', '', 'error-snackbar');
        })
      } else {
        this.dataLoader = false;
        this.snackBar.openSnackBar('Please Upload Valide Excel', '', 'error-snackbar');
      }
    }
  }

  get_header_row(sheet) {
    var headers = [];
    var range = XLSX.utils.decode_range(sheet['!ref']);
    var C, R = range.s.r; /* start in the first row */
    /* walk every column in the range */
    for (C = range.s.c; C <= range.e.c; ++C) {
      var cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
      headers.push(cell['h']);
    }
    return headers;
  }

  formatDate(date) {
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
  }

  excelDateToJSDate(serial) {
  var date = new Date(Math.round((serial - 25569)*86400*1000));
    var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
 }
}
