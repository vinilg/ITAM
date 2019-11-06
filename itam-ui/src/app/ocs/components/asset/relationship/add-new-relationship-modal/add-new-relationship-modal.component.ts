import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable,of } from 'rxjs';
import { OcsService } from '../../../../ocs.service';
import { mergeMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { SnackBarService } from '../../../../../base/services/snack-bar.service';
import { Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-new-relationship-modal',
  templateUrl: './add-new-relationship-modal.component.html',
  styleUrls: ['./add-new-relationship-modal.component.css', '../../../../ocs.component.css']
})
export class AddNewRelationshipModalComponent implements OnInit {
  relatedCiDataSource:any=[];
  relatedCiId:any;
  relatedCis:any=[];
  searchedCi:any;
  selectedType:any=0;
  selectedParentCi:any;
  isDisableRelatedCi:boolean;
  relationShipTypes:any=[];
  constructor(public dialogRef: MatDialogRef<AddNewRelationshipModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any, private ocsService:OcsService,
    private snackBar:SnackBarService) {
      this.relatedCiDataSource = Observable.create((observer: any) => {
        observer.next(this.searchedCi);
      }).pipe(
          mergeMap((token: string) => this.getStatesAsObservable(token, this.searchedCi))
        );
    }

  getStatesAsObservable(token: string, value: String): Observable<any> {
    this.ocsService.getHostDataBasedOnSearch(this.data.id,this.selectedType,value,resp=>{
      this.relatedCis = resp.data;
    }, error=>{}) 
    const query = new RegExp(token, 'i');
      return of(
      this.relatedCis.filter((ci: any) => {
        return query.test(ci.hardwareName);
      })
    );
  }
  ngOnInit() {
    this.selectedParentCi = this.data.name;
    this.getAllRelationshipTypes();
  }

  getAllRelationshipTypes(){
    this.ocsService.getAllRelationshipType(resp=>{
      this.relationShipTypes = resp.data;
    }, error=>{})
  }

  onRelationTypeChange(type){
    this.searchedCi = "";
    this.relatedCis = [];
  }

  onSelectRelatedCi(e: TypeaheadMatch): void {
    console.log(e.item.hardwareName)
    this.searchedCi = e.item.hardwareName;
    this.relatedCiId = e.item.id;
  }

  onClickAddRelationship(){
    let obj = {
      "ciId": parseInt(this.data.id),
      "relationId": this.selectedType,
      "relatedCiId": this.relatedCiId
    }
    this.ocsService.postAddNewRelationShip(obj, resp=>{
      if(resp.responseCode == 0){
        this.snackBar.openSnackBar('Relationship Added Successfully', '','success-snackbar');
        this.onCancelModel();
      }
    }, error=>{

    })
  }

  onCancelModel(){
    this.dialogRef.close();
  }

}
