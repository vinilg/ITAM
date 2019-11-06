import { Component, OnInit } from '@angular/core';
import { OcsService } from '../../../../ocs.service';

@Component({
  selector: 'app-manage-software-configuration',
  templateUrl: './manage-software-configuration.component.html',
  styleUrls: ['./manage-software-configuration.component.css', '../../../../ocs.component.css']
})
export class ManageSoftwareConfigurationComponent implements OnInit {
  dataLoader:boolean;
  config = {
    displayKey:"name",
    search:true,
    height: '200px',
    placeholder:'Select',
    limitTo: 10,
    moreText: 'more',
    noResultsFound: 'No results found!',
    searchPlaceholder:'Search',
    searchOnKey: 'name'
  }
  selectedLicense:any;
  searchedKeyword:any = '';
  licenseMaster:any = [];
  softwareMappingDetails:any = [];
  searchedSoftwareDetails:any = [];
  listOfSoftwaresForMapping:any = [];
  listOfSoftwareToRemove:any = [];

  softwareToLicenseMapping:any = {};
  isSubmitted:boolean;

  constructor(private ocsService : OcsService) { }

  ngOnInit() {
    this.getAllLicenses();
  }

  getAllLicenses(){
    this.dataLoader = true
    this.ocsService.getAllLicense(resp=>{
      this.licenseMaster = resp.data;
      this.dataLoader = false;
    }, error=>{})
  }

  selectionChanged(selectedLicense){
    this.dataLoader = true;
    this.ocsService.getSoftwareMappingForSelectedLicense(selectedLicense.id, resp=>{
      this.softwareMappingDetails = resp.data;
      for(let i = 0; i < this.softwareMappingDetails.length; i++){
        for(let j = this.searchedSoftwareDetails.length - 1; j >= 0; j--){
          if(this.searchedSoftwareDetails[j].id == this.softwareMappingDetails[i].id){
            this.searchedSoftwareDetails.splice(j, 1);
          }
        }
      }
      this.dataLoader = false;
    }, error=>{})
  }

  searchSoftwares(keyword){
    this.dataLoader = true;
    this.ocsService.getSoftwareDetailsBasedOnKeyword(keyword, resp=>{
      this.searchedSoftwareDetails = resp.data;
      if(this.selectedLicense){
        for(let i = 0; i < this.softwareMappingDetails.length; i++){
          for(let j = this.searchedSoftwareDetails.length - 1; j >= 0; j--){
            if(this.searchedSoftwareDetails[j].id == this.softwareMappingDetails[i].id){
              this.searchedSoftwareDetails.splice(j, 1);
            }
          }
        }
      }
      this.dataLoader = false;
    }, error=>{})
  }

  onAddSoftwareChange(obj, event){
    if(event.checked){
      this.listOfSoftwaresForMapping.push(obj.id);
    }else {
      this.listOfSoftwaresForMapping.splice(this.listOfSoftwaresForMapping.indexOf(obj.id),1)
    }
  }

  onRemoveSoftwareMappingChange(obj, event){
    if(event.checked){
      this.listOfSoftwareToRemove.push(obj.id);
    }else {
      this.listOfSoftwareToRemove.splice(this.listOfSoftwareToRemove.indexOf(obj.id),1)
    }
  }

  onSubmit(){
    this.dataLoader = true;
    this.isSubmitted = true;
    if((this.searchedKeyword == '' && this.selectedLicense && this.listOfSoftwareToRemove.length == 0) || (this.searchedKeyword != '' && this.searchedSoftwareDetails.length > 0 && this.listOfSoftwaresForMapping.length == 0)
        || (this.searchedKeyword != '' && this.searchedSoftwareDetails.length > 0 && this.listOfSoftwaresForMapping.length > 0 && !this.selectedLicense)){
      this.dataLoader = false;
      return;
    }
    this.softwareToLicenseMapping = {
      "listOfSoftwaresToAdd": this.listOfSoftwaresForMapping,
      "listOfSoftwaresToRemove":this.listOfSoftwareToRemove,
      "selectedLicenseId":this.selectedLicense.id
    }

    this.ocsService.postSoftwareToLicenseMappings(this.softwareToLicenseMapping, resp=>{
      if(resp.responseCode == 0){
        this.listOfSoftwaresForMapping = [];
        this.listOfSoftwareToRemove = [];
        this.selectionChanged(this.selectedLicense);
        this.searchSoftwares(this.searchedKeyword);
        this.dataLoader = false;
        this.isSubmitted = false;
      }
    }, error=>{
      this.dataLoader = false;
    })
  }

}
