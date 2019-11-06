import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import { OcsService } from '../../../ocs.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sam-dashboard',
  templateUrl: './sam-dashboard.component.html',
  styleUrls: ['./sam-dashboard.component.css']
})
export class SamDashboardComponent implements OnInit {
  dataLoader:boolean;
  softwareComplianceData: any=[];
  softwareCategoryData:any={};
  softwareTypeData:any=[];
  licenseOemData:any=[];
  baseSoftwareData:any;
  softwareComplianceOption: any;
  softwareCategoryOption: any;
  softwareTypeOption:any;
  licenseOemChartOption:any;
  categoryMaster:any = []
  Highcharts = Highcharts;
  constructor(private ocsService:OcsService, private router : Router) { }

  ngOnInit() {
    this.dataLoader = true;
    this.ocsService.getSoftwareFilterMasterData(resp=>{
      resp.data.softwareCategories.forEach(data=>{
        this.categoryMaster.push(data.name);
      })
      this.getSoftwareDashboardDetails();
    }, error=>{})
  }

  getSoftwareDashboardDetails(){
    this.ocsService.getSoftwareDashboardData(resp=>{
      this.baseSoftwareData = resp.data.tilesDetail;
      this.softwareComplianceData = resp.data.softwareByComplianceType;
      this.softwareCategoryData.categories = this.categoryMaster;
      this.softwareCategoryData.categoryWiseData = resp.data.softwareByCategory;
      this.softwareTypeData = resp.data.softwareByType;
      this.licenseOemData = resp.data.licenseByOem;
      this.setSoftwareComplianceChart(this.softwareComplianceData);
      this.setSoftwareByCategoryChart(this.softwareCategoryData);
      this.setLicenseTypeChart(this.softwareTypeData);
      this.setLicenseByOemChart(this.licenseOemData);
      this.dataLoader = false;
    },error=>{})
  }

  onSoftwareTileClick(input){
    if(input == 'All'){
      this.router.navigate(['/ocs/sam/licenses'],{});
    }else{
      this.router.navigate(['/ocs/sam/licenses'], { queryParams: {filterCode:input}})
    }
  }

  setSoftwareComplianceChart = function (data) {
    this.softwareComplianceOption = {
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
        pointFormat: 'State: <b>{point.percentage:.1f} %</b>'
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
                this.router.navigate(['/ocs/sam'], { queryParams: {filterCode: event.point.name}}); 
              }.bind(this)
          }
      }
      }],
      credits: {
        enabled: false
      }
    };

  }

  setLicenseByOemChart = function (data) {
    this.licenseOemChartOption = {
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
          text: 'OEM'
        }
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
        name: 'OEM',
        data:data,
        minPointLength: 5,
        cursor: 'pointer',
        point: {
          events: {
            load:function(){
              this.showLoading();
            },
              click: function(event) {
                  this.router.navigate(['/ocs/sam/licenses'], { queryParams: {filterCode: event.point.name}}); 
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


  setSoftwareByCategoryChart = function (data) {
    this.softwareCategoryOption = {
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
        categories: data.categories,
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
        valueSuffix: ' millions'
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
        data: data.categoryWiseData
      }]
    }
  }


  setLicenseTypeChart(data) {
    this.softwareTypeOption = {
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
        text: 'Software<br>Types',
        align: 'center',
        verticalAlign: 'middle',
        y: 40
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
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
                this.router.navigate(['/ocs/sam'], { queryParams: {filterCode: event.point.name}}); 
              }.bind(this)
          }
      }
      }]
    }
  }
}
