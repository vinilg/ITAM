import { Component, OnInit, ViewChild } from '@angular/core';
import { OcsService } from './../../ocs.service';
import { TableHeaderComponent } from '../../../base/components/table-header/table-header.component';

@Component({
  selector: 'app-temp',
  templateUrl: './temp.component.html',
  styleUrls: ['./temp.component.css','../../ocs.component.css']
})
export class TempComponent implements OnInit {
  @ViewChild(TableHeaderComponent) tableHeader: TableHeaderComponent;
  allAssets: any = [];
  dataLoader: boolean = false;
  showSearchbox:boolean = false;
  availableStatus:any = [];
  availableCategories:any = [];
  assetFilterObj:any = {
    selectedStatus: '',
    selectedCategory: ''
  }
  
  noFilterSelect:boolean;
  searchPostData:any = {
    'params':[]
  };
  constructor(private ocsService: OcsService) { }

  ngOnInit() {
    this.dataLoader = true;
    this.getFilterMasterData();
    this.generateAssetList(false, this.searchPostData);
  }

  onChangeFilter(pageInfo){
    this.generateAssetList(pageInfo, this.searchPostData);
  }

  generateAssetList(pageInfo, searchParameters){
    let assetListQueryString;
    if (pageInfo) {
      assetListQueryString = assetListQueryString ? assetListQueryString + "&": "?";
      if (pageInfo.searchText) {
        assetListQueryString += "search=" + pageInfo.searchText + "&";
      }
      assetListQueryString += "page=" + pageInfo.number + "&size=" + pageInfo.size;
  }
  this.doGetAssetList(assetListQueryString ? assetListQueryString+ "&page=0&size=50" : "?page=0&size=50", searchParameters);
  }

  doGetAssetList(queryString, searchParameters){
    this.dataLoader = true;
    this.ocsService.postTempAssets(queryString,searchParameters,resp => {
      this.allAssets = resp.data;
      this.tableHeader.configPagination(this.allAssets.pagination)
      this.dataLoader = false;
    }, err => {
      this.dataLoader = false;
    })
  }

  showhideSearch(){
    this.showSearchbox  = !this.showSearchbox;
  }

  getFilterMasterData(){
    this.ocsService.getFilterMasterData(resp=>{
      this.availableStatus = resp.data.allAvailableStatus;
      this.availableCategories = resp.data.allAvaiableCategories;
    }, error=>{

    })
  }

  searchAssets(formDatas){
    this.searchPostData.params = [];
    this.noFilterSelect = false;
    if (formDatas.value.status == '' && formDatas.value.category == ''){
      this.noFilterSelect = true;
        return;
    }
    this.dataLoader = true;
    if (formDatas.value.status != '' && (formDatas.value.category == '' || formDatas.value.category == undefined)){
      this.searchPostData.params.push({'field': 'status', 'operation': 'EQUALITY', 'value': formDatas.value.status});
    }else if ((formDatas.value.status == '' || formDatas.value.status == undefined) && formDatas.value.category != ''){
      this.searchPostData.params.push({'field': 'category', 'operation': 'EQUALITY', 'value': formDatas.value.category});
    }
    this.generateAssetList(false, this.searchPostData);

  }

  clearFilters(){
    this.searchPostData.params = [];
    this.assetFilterObj = {
      selectedStatus: '',
      selectedCategory: ''
    };
    this.generateAssetList(false, this.searchPostData);
  }
}
