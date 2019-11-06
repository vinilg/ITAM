import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { OcsService } from '../../../../ocs.service';
import { Params, ActivatedRoute } from '@angular/router';
import { SnackBarService } from '../../../../../base/services/snack-bar.service';
import { Observable, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { mergeMap } from 'rxjs/operators';
@Component({
  selector: 'app-edit-asset',
  templateUrl: './edit-asset.component.html',
  styleUrls: ['./edit-asset.component.css','../../../../ocs.component.css']
})
export class EditAssetComponent implements OnInit {
  filteredOptions: Observable<string[]>;
  assetId: any;
  dataLoader:boolean;
  assetDetails: any;
  processorDetails:any=[];
  editAssetFieldObj:any={};
  updateDataList:any = [];
  filterMasterData:any;
  assetBasicDetails:any = {};
  postAssetUpdate:any = {};
  assetSiteMaster:any = [];
  serialNumber:any;
  userDetails:any = [];
  ownerName:any;
  ownerDataSource:any = [];
  typeaheadLoading:boolean;
  selectedSite:any;
  showContractDetails:boolean;

  @Output() submitEvent = new EventEmitter<any>();
  constructor(private ocsService: OcsService, private route: ActivatedRoute, private snackBar:SnackBarService) { 
    this.route.params.subscribe((params: Params) => {
      this.assetId = params['id'];
    });
        this.ownerDataSource = Observable.create((observer: any) => {
          observer.next(this.ownerName);
        }).pipe(
            mergeMap((token: string) => this.getStatesAsObservable(token, this.ownerName))
        );
  }

  getStatesAsObservable(token: string, value: String): Observable<any> {
    let obj = {
      active: true,
      customerId: "",
      includeInternal: true,
      minimal: true,
      searchText: value
    }
    this.ocsService.userInfo(obj, resp=>{
      this.userDetails = resp.content;
    }, error=>{}) 
    const query = new RegExp(token, 'i');
      return of(
      this.userDetails.filter((user: any) => {
        return query.test(user.userId) || query.test(user.firstName) || query.test(user.lastName);
      })
    );
  }

  ngOnInit() {
    this.ocsService.getFilterMasterData(resp=>{
      this.filterMasterData = resp.data;
      this.getAssetDetails(this.assetId);
    },error=>{

    })
  }

  getAssetDetails(id) {
    this.dataLoader = true;
    this.ocsService.getEditAssetDetails(id, resp => {
      this.assetDetails = resp.data;
      if(this.assetDetails.hardwareDetails.assetCategory.id != 45){
        this.showContractDetails = true;
      }
      this.serialNumber = resp.data.hardwareDetails.serialNumber;
      if(this.assetDetails.hardwareDetails.location != null){
        this.onChangeLocation(this.assetDetails.hardwareDetails.location.id);
      }
      this.assetBasicDetails = {
        "selectedStatus" : this.assetDetails.hardwareDetails.assetStatus.id,
        "commissionedDate" : this.assetDetails.hardwareDetails.commissionedDate,
        "deCommissionedDate": this.assetDetails.hardwareDetails.deCommissionedDate,
        "supportStartDate": this.assetDetails.hardwareDetails.supportStartDate,
        "supportEndDate":this.assetDetails.hardwareDetails.supportEndDate,
        "selectedSite":this.assetDetails.hardwareDetails.site != null?this.assetDetails.hardwareDetails.site.id:null,
        "selectedLocation":this.assetDetails.hardwareDetails.location != null?this.assetDetails.hardwareDetails.location.id:null,
        "purchaseDate":this.assetDetails.hardwareDetails.purchaseDate,
      }
      Object.keys(this.assetDetails.attributes).forEach(data=>{
        if(data == 'Processor Details'){
          this.processorDetails = this.assetDetails.attributes[data];
          this.processorDetails.forEach(data =>{
            this.editAssetFieldObj[data.attributeDetails.attrbuteId] = data.attributeDetails.attributeValue;
            
          })
        } else {
          this.assetDetails.attributes[data].forEach(data =>{
            if(data.attributeDetails.attributeName == 'Owner Name'){
              this.ownerName = data.attributeDetails.attributeValue;
            }
            this.editAssetFieldObj[data.attributeDetails.attrbuteId] = data.attributeDetails.attributeValue;
            
          })
        }
      })
      this.dataLoader = false;
    }, err => {

    })
  }

  onSubmit(editAssetForm){
    this.dataLoader = true;
    let poNumber = null;
    Object.keys(editAssetForm).forEach(data=>{
      if(parseInt(data) == 558){
        poNumber = editAssetForm[data]
      }else if(parseInt(data) == 567){
        if(!this.ownerName){
          editAssetForm[data] = null;
        }
      }
      this.updateDataList.push({
        attrbuteId:parseInt(data),
        attributeValue:editAssetForm[data]
      })
    });

    this.postAssetUpdate = {
      "statusId" : this.assetBasicDetails.selectedStatus,
      "commissionedDate" : this.assetBasicDetails.commissionedDate != null ? this.formatDate(this.assetBasicDetails.commissionedDate) : null,
      "deCommissionedDate": this.assetBasicDetails.deCommissionedDate != null ? this.formatDate(this.assetBasicDetails.deCommissionedDate) : null,
      "supportStartDate": this.assetBasicDetails.supportStartDate != null ? this.formatDate(this.assetBasicDetails.supportStartDate) : null,
      "supportEndDate":this.assetBasicDetails.supportEndDate != null ? this.formatDate(this.assetBasicDetails.supportEndDate) : null,
      "site":this.selectedSite,
      "location":this.assetDetails.selectedLocation,
      "purchaseDate":this.assetBasicDetails.purchaseDate != null ? this.formatDate(this.assetBasicDetails.purchaseDate) : null,
      "serialNumber":this.serialNumber,
      "ownerName":this.ownerName,
      "poNumber": poNumber,
      "attributes" : this.updateDataList
    }
    this.ocsService.updateAssetDetails(this.assetId,this.postAssetUpdate, resp=>{
      if(resp.responseCode == 0){
        this.dataLoader = false;
        this.snackBar.openSnackBar('Updated SuccessFully', '','success-snackbar');
        this.submitEvent.emit("Updated SuccessFully")
      }
    }, error=>{

    })
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

  onClickCancel(){
    this.submitEvent.emit("Cancel Event")
  }

  onChangeLocation(location){
    this.assetSiteMaster = [];
    this.assetBasicDetails.selectedSite = null;
    this.filterMasterData.allSites.forEach(data=>{
      if(data.locationId == location){
        this.assetSiteMaster.push(data);
      }
    })
    this.assetDetails.selectedLocation = location;
  }

  onChangeSite(site){
    this.selectedSite = site;
  }

  onSelectOwnerName(e: TypeaheadMatch, attributeId): void {
    this.ownerName = e.item.firstName + " " + e.item.lastName
    this.editAssetFieldObj[attributeId] = this.ownerName;
  }


}
