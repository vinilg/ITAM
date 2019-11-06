import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OcsService } from '../../../ocs.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AssetFamilyDetailsDialogComponent } from './asset-family-details-dialog/asset-family-details-dialog.component';
import Drilldown from 'highcharts/modules/drilldown';
Drilldown(Highcharts);

@Component({
  selector: 'app-hardware-dashboard',
  templateUrl: './hardware-dashboard.component.html',
  styleUrls: ['./hardware-dashboard.component.css']
})
export class HardwareDashboardComponent implements OnInit {
  assetOsData: any = [];
  assetStatusMaster:any = [];
  allManufacturers:any=[];
  assetByFamily:any;
  dataLoader:boolean;
  assetCategoryData:any=[];
  assetManufacturerChartData:any={}
  assetStatusData:any=[];
  assetRoleData:any=[];
  assetRoleChartData:any={
    parentData:[],
    drilldownData:[]
  };
  baseAssetData:any;
  assetOsOption:any;
  assetRoleOption:any;
  categoryLoader:boolean;
  dashboardFilterData:any ={};
  dashboardSerachObj:any = {};
  assetFamilyIcon = ['fa-phone', 'fa-wifi', 'fa-shield', 'fa-server', 'fa-archive', 'fa-desktop']
  selectedStatus:any={
    id:0,
    name:'All'
  }
  familyWiseCategoryData:any = {
    categoryData : [],
    familyName:''
  };
  assetCategoryChartOption: any;
  assetManufacturerChartOption: any;
  assetStatusChartOption: any;
  Highcharts = Highcharts;
  constructor(private ocsService:OcsService, private router : Router, public dialog: MatDialog) {
   }

  ngOnInit() {
    this.dataLoader = true;
    this.getFilterMasterData();
    }

    getFilterMasterData(){
      this.ocsService.getFilterMasterData(resp=>{
        this.assetStatusMaster = resp.data.allAvailableStatus;
        this.getDashBoardFilterData(this.selectedStatus);
      }, error=>{})
    }

  getDashBoardFilterData(selectedStatus){
    this.dashboardFilterData.statusFilter=selectedStatus;
    this.ocsService.getDashboardDetails(this.dashboardFilterData,resp =>{
      this.baseAssetData = resp.data.basicAssetsTilesData;
      this.assetStatusData = resp.data.hardwareByState;
      this.assetOsData = resp.data.hardwareByOS;
      this.assetRoleData = resp.data.hardwareByRole;
      this.assetRoleData.forEach(data=>{
        if(data.isParent){
          let childData = [];
          let parentObj = {
            "name":data.name,
            "y":data.y,
            "drilldown":data.name
          }
          this.assetRoleChartData.parentData.push(parentObj);
          this.assetRoleData.forEach(child=>{
            if(child.parentName == data.name){
              let subCategoryData = [child.name, child.y]
              childData.push(subCategoryData);
            }
          })
          if(childData.length > 0){
            let childObj = {
              "name":data.name,
              "id":data.name,
              "data":childData
            }
            this.assetRoleChartData.drilldownData.push(childObj)
          } 
        }
      })
      this.assetManufacturerChartData.manufacturer = this.allManufacturers;
      this.assetManufacturerChartData.manufacturerData = resp.data.hardwareByManufacturer;
      this.assetCategoryData = resp.data.hardwareByCategory;
      this.assetByFamily = resp.data.hardwareByFamily;
      this.setAssetOsChart(this.assetOsData);
      this.setAssetByCategoryChart(this.assetCategoryData);
      this.setAssetByManufacturerChart(this.assetManufacturerChartData);
      this.setAssetStatusChart(this.assetStatusData);
      this.setAssetByRoleChart(this.assetRoleChartData);
      this.dataLoader = false;
      this.categoryLoader = false;
    },error=>{})
  }

  OnInfoClick(assetFamily){
    this.ocsService.getFamilyWiseCategoryData(assetFamily, resp=>{
      this.familyWiseCategoryData = {
        categoryData : resp.data,
        familyName : assetFamily
      }
      const dialogRef = this.dialog.open(AssetFamilyDetailsDialogComponent, {
        width: '600px',
        data: this.familyWiseCategoryData
      });
  
      dialogRef.afterClosed().subscribe(result => {
      });
    }, error=>{

    })
  }

  onAssetsTileClick(input){
    if(input == 'All'){
      this.router.navigate(['/ocs/asset'],{});
    }else{
      this.router.navigate(['/ocs/asset'], { queryParams: {filterCode:input}})
    }
  }

  onChangeStatusFilter(event){
    this.categoryLoader = true;
    if(event.target.value == 0){
      this.selectedStatus={
        id:0,
        name:'All'
      }
    }
    this.assetStatusMaster.forEach(data=>{
      if(event.target.value == data.id){
        this.selectedStatus={
          id:data.id,
          name:data.name
        }
      }
    })
    this.getDashBoardFilterData(this.selectedStatus);
  }

  searchDashboardData(searchData){
    console.log(searchData);


  }

  setAssetOsChart = function (data) {
    this.assetOsOption = {
      chart: {
        height: 300,
        width: 360,
        backgroundColor: null,
        margin: [10, 10, 60, 0],
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0,
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: 'Value: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          cursor: 'pointer',
          depth: 35,
          size: '100%',
          showInLegend: true,
          colors: ['#3498DB', '#1ABB9C', '#9B59B6', '#E74C3C', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
          dataLabels: {
            enabled: false,
            distance: -30,
            format: '<b>{point.percentage:.1f} %<b>',
            style: {
              color: 'black'
            }
          },
        }
      },
      legend: {
        enabled: true,
        format: 'horizontal',
        labelFormatter: function () {
          return this.name + '(' + this.options.y + ')';
        }
      },
      series: [{
        name: '',
        colorByPoint: true,
        data: data,
        cursor: 'pointer',
        point: {
          events: {
              click: function(event) {
                this.router.navigate(['/ocs/asset'], { queryParams: {filterCode: event.point.name}}); 
              }.bind(this)
          }
      }
      }],
      credits: {
        enabled: false
      }
    };

  }

  setAssetByRoleChart = function (data) {
    this.assetRoleOption = {
      chart: {
        height: 300,
        width: 360,
        backgroundColor: null,
        margin: [10, 10, 60, 0],
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0,
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0
        }
      },
      title: {
        text: ''
      },
      tooltip: {
        pointFormat: 'Value: <b>{point.y}</b>'
      },
      plotOptions: {
        pie: {
          cursor: 'pointer',
          depth: 35,
          size: '100%',
          showInLegend: true,
          colors: ['#FF9655','#9B59B6','#3498DB'],
          dataLabels: {
            enabled: false,
            distance: -30,
            format: '<b>{point.percentage:.1f} %<b>',
            style: {
              color: 'black'
            }
          }
        },
        series: {
          cursor: 'pointer',
          point: {
              events: {
                  click: function(e) {
                    if(e.point.name != null){
                      this.router.navigate(['/ocs/asset'], { queryParams: {filterCode:e.point.name}});
                    }
                  }.bind(this)
              }
          }
          
      }
      },
      legend: {
        enabled: true,
        format: 'horizontal',
        labelFormatter: function () {
          return this.name + '(' + this.options.y + ')';
        }
      },
      series: [{
        name: '',
        colorByPoint: true,
        data: data.parentData,
        cursor: 'pointer',
      }],
      drilldown: {
        series:data.drilldownData,
      },
      credits: {
        enabled: false
      }
    };

  }

  setAssetByCategoryChart = function (data) {
    this.assetCategoryChartOption = {
      chart: {
        height: 400,
        width: 1120,
        zoomType: "xy",
        backgroundColor: '#ffffff',
        type: 'column',
      },
      xAxis: {
        type: 'category',
        title: {
          text: 'Category'
        }
      },
      title: {
        text: ''
      },

      yAxis: {
        allowDecimals: false,
        gridLineWidth: 0.7,
        minorGridLineWidth: 0.7,
        title: {
          text: 'Count'
        }
      },
      legend: {
        enabled: false
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          }
        }
      },
      colors: ['#1ABB9C'],
      series: [{
        name: 'Category',
        data:data,
        minPointLength: 5,
        cursor: 'pointer',
        point: {
          events: {
            load:function(){
              this.showLoading();
            },
              click: function(event) {
                if(this.selectedStatus.name != "All"){
                  this.router.navigate(['/ocs/asset'], { queryParams: {filterCode: event.point.name, filterCode1:this.selectedStatus.name}}); 
                }else{
                  this.router.navigate(['/ocs/asset'], { queryParams: {filterCode: event.point.name}}); 
                }
              }.bind(this)
          }
      }
       }],

      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: "Value: <b>{point.y}</b>"
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom',
          //enabled:true
        }
      }
    }

  }

  setAssetByManufacturerChart = function (data) {
    this.assetManufacturerChartOption = {
      chart: {
        type: 'bar',
        height: 300,
        width: 360,
        backgroundColor: null
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: data.manufacturer,
        title: {
          text: null
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: '',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
       tooltip: {
        pointFormat: "Value: <b>{point.y}</b>"
       },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      colors: ['#1ABB9C'],
      credits: {
        enabled: false
      },
      series: [{
        showInLegend: false,
        name:'',
        data: data.manufacturerData
      }]
    }
  }


  setAssetStatusChart(data) {
    this.assetStatusChartOption = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: 0,
        plotShadow: false,
        margin: [10, 10, 60, 0],
        spacingTop: 0,
        spacingBottom: 0,
        spacingLeft: 0,
        spacingRight: 0,
        width: 360,
        height: 300
      },
      title: {
        text: 'Asset<br>Status',
        align: 'center',
        verticalAlign: 'middle',
        y: 10
      },
      tooltip: {
        pointFormat: 'Value: <b>{point.y}</b>'
      },

      plotOptions: {
        pie: {
          dataLabels: {
            enabled: false,
          },
          showInLegend: true,
          startAngle: -90,
          endAngle: 90,
          center: ['50%', '75%'],
          size: '150%'
        }
      },
      colors: ['#3498DB', '#1ABB9C', '#9B59B6', '#E74C3C', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
      credits: {
        enabled: false
      },
      series: [{
        type: 'pie',
        name: '',
        innerSize: '50%',
        data:data,
        cursor: 'pointer',
        point: {
          events: {
              click: function(event) {
                this.router.navigate(['/ocs/asset'], { queryParams: {filterCode: event.point.name}}); 
              }.bind(this)
          }
      }
      }]
    }
  }
}
