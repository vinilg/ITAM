import { Component, OnInit } from '@angular/core';
import { OcsService } from './../../../ocs.service';

@Component({
  selector: 'app-delta-software',
  templateUrl: './software.component.html',
  styleUrls: ['./software.component.css', '../../../ocs.component.css']
})
export class DeltaSoftwareComponent implements OnInit {
  deltaSoftwareDetails: any = {};
  deltaSoftwareDeletedData: any = {};
  deltaSoftwareNewData: any = {};
  deltaSoftwareCompareData: any = {};
  allAssets: any = {}
  deltaSoftwareNewDataKey: any = [];
  deltaSoftwareDeletedDataKey: any = [];
  deltaSoftwareCompareDataKey: any = [];
  deltaSoftwareNewDataObj: any = [];
  deltaSoftwareDeletedDataObj: any = [];
  deltaSoftwareCompareDataObj: any = [];
  newTableData: any = [];
  compareTableData: any = [];
  deletedTableData: any = [];


  constructor(private ocsService: OcsService) { }

  ngOnInit() {
    this.ocsService.getSoftwareDeltaDetails(resp => {
      this.deltaSoftwareDetails = resp.data;
      this.deltaSoftwareDeletedData = this.deltaSoftwareDetails.assetWiseDeletedSoftware;
      this.deltaSoftwareNewData = this.deltaSoftwareDetails.assetWiseNewSoftware;
      this.deltaSoftwareCompareData = this.deltaSoftwareDetails.assetWiseSoftwareCompare;
      if(this.deltaSoftwareDeletedData != null){
        this.deltaSoftwareNewDataKey = Object.keys(this.deltaSoftwareNewData);
      }
      if(this.deltaSoftwareNewData != null){
        this.deltaSoftwareDeletedDataKey = Object.keys(this.deltaSoftwareDeletedData)
      }

      if(this.deltaSoftwareCompareData != null){
        this.deltaSoftwareCompareDataKey = Object.keys(this.deltaSoftwareCompareData)

      }
      //this.getAsset();
    }, err => {

    })

  }

  // getAsset() {
  //   this.ocsService.getAllAssets(resp => {
  //     this.allAssets = resp.data;
  //     this.deltaSoftwareNewDataKey.forEach(data => {
  //       this.allAssets.forEach(element => {
  //         if (element.basicHardware.id == data) {
  //           this.deltaSoftwareNewDataObj.push({ "id": element.basicHardware.id, "name": element.basicHardware.hardwareName })
  //         }
  //       })
  //     })

  //     this.deltaSoftwareDeletedDataKey.forEach(deldata => {
  //       this.allAssets.forEach(element => {
  //         if (element.basicHardware.id == deldata) {
  //           this.deltaSoftwareDeletedDataObj.push({ "id": element.basicHardware.id, "name": element.basicHardware.hardwareName })
  //         }
  //       })
  //     })

  //     this.deltaSoftwareCompareDataKey.forEach(compdata => {
  //       this.allAssets.forEach(element => {
  //         if (element.basicHardware.id == compdata) {
  //           this.deltaSoftwareCompareDataObj.push({ "id": element.basicHardware.id, "name": element.basicHardware.hardwareName })
  //         }
  //       })
  //     })
  //   }, err => {
  //   })
  // }

  getNewObj(id) {
    this.newTableData = this.deltaSoftwareNewData[id]
  }

  getDeletedObj(id) {
    this.deletedTableData = this.deltaSoftwareDeletedData[id]
  }

}
