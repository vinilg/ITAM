import { Component, OnInit } from '@angular/core';
import { OcsService } from '../../ocs.service';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css','../../ocs.component.css']
})
export class ReportsComponent implements OnInit {
  exportObj:any = {
    selectedSource:0
  };

  exportDatas:any;
  attributes:any = [];
  attributesInOrder:any = [];
  attributesValuesInOrder = {};
  attributesValuesInOrderArray = [];
  excelFileName:any='';
  dataLoader:boolean;


  exportOptions: any = [{
    id: 1,
    option: "Active Asset Inventory"
  },
  {
    id: 2,
    option: "Stock Asset Inventory"
  },{
    id: 3,
    option: "Network Inventory"
  }]

  constructor(private ocsService : OcsService) { }

  ngOnInit() {}

  export(data){
    this.dataLoader = true;
    this.attributesValuesInOrderArray = [];
    this.attributesInOrder = [];
    if(data.selectedSource == 1){
      this.excelFileName = "ITAM_ASSET_DUMP";
    }else if(data.selectedSource == 2){
      this.excelFileName = "ITAM_STOCK_ASSET_DUMP";
    }else if(data.selectedSource == 3){
      this.excelFileName = "ITAM_NETWORK_ASSET_DUMP";
    }
    this.ocsService.exportData(data.selectedSource, resp=>{
      this.exportDatas = resp.data.exportData;
      this.attributes = resp.data.attributes;
      this.attributes.forEach(data=>{
        this.attributesInOrder.push(data.attributeName);
      })
      this.attributesInOrder.splice(0,0,"System Name");
      this.attributesInOrder.splice(1,0,"Category");
      this.attributesInOrder.splice(2,0,"Asset Family");
      this.attributesInOrder.splice(3,0,"Status");
      this.attributesInOrder.splice(4,0,"Connected User");
      this.attributesInOrder.splice(5,0,"Location");
      this.attributesInOrder.splice(6,0,"Site");
      this.attributesInOrder.splice(7,0,"Purchase Date");
      this.attributesInOrder.splice(8,0,"Commissioned Date");
      this.attributesInOrder.splice(9,0,"Decommissioned Date");
      this.attributesInOrder.splice(10,0,"Support Start Date");
      this.attributesInOrder.splice(11,0,"Support End Date");
      this.attributesInOrder.splice(12,0,"Source");
      for(let i = 0; i < this.exportDatas.length; i++){
        this.attributesValuesInOrder = {};
        for(let j = 0; j < this.attributesInOrder.length; j++){
          this.attributesValuesInOrder[this.attributesInOrder[j]] = this.exportDatas[i][this.attributesInOrder[j]] == undefined ? '': this.exportDatas[i][this.attributesInOrder[j]];
        }
        this.attributesValuesInOrderArray.push(this.attributesValuesInOrder);
      }
      var options = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalseparator: '.',
        showLabels: true, 
        useBom: true,
        headers:this.attributesInOrder,
        nullToEmptyString: true,
      };
      new Angular5Csv(this.attributesValuesInOrderArray, this.excelFileName, options);
      this.dataLoader = false;
      this.exportObj.selectedSource = 0;
    }, error=>{

    })
  }
}
