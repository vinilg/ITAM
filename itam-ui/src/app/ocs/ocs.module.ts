import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { BaseModule } from '../base/base.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AccordionModule,ModalModule, TypeaheadModule  } from 'ngx-bootstrap';

import { ocsRoutes } from './ocs.route';
import { OcsService } from './ocs.service';
import { AssetComponent } from './components/asset/asset.component';
import { DeltaComponent } from './components/delta/delta.component';
import { TempComponent } from './components/temp/temp.component';
import { AssetDetailsComponent } from './components/asset/asset-details/asset-details.component';
import { AdministrativeHardwareDataComponent } from './components/asset/administrative-hardware-data/administrative-hardware-data.component';
import { SoftwareComponent } from './components/asset/software/software.component';
import { RelationshipComponent } from './components/asset/relationship/relationship.component';
import { HardwareComponent } from './components/delta/hardware/hardware.component';
import { DeltaSoftwareComponent } from './components/delta/software/software.component';
import { TempAdministrativeHardwareDataComponent } from './components/temp/administrative-hardware-data/administrative-hardware-data.component';
import { TempAssetDetailsComponent } from './components/temp/asset-details/asset-details.component';
import { TempSoftwareComponent } from './components/temp/software/software.component';
import { ScanComponent } from './components/delta/scan/scan.component';
import { TempRelationshipComponent } from './components/temp/relationship/temp.relationship.component';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule, MatAutocompleteModule } from '@angular/material';
import {MatSortModule} from '@angular/material/sort';
import { PaginationModule } from 'ngx-bootstrap';
import { SamComponent } from './components/sam/sam.component';
import { SamSummaryComponent } from './components/sam/sam-summary/sam-summary.component';
import { SamLicensesComponent } from './components/sam/sam-licenses/sam-licenses.component';
import { SamDetailsComponent } from './components/sam/sam-details/sam-details.component';
import { DetailsComponent } from './components/sam/sam-details/details/details.component';
import { LicensesComponent } from './components/sam/sam-details/licenses/licenses.component';
import { InstallationsComponent } from './components/sam/sam-details/installations/installations.component';
import { LicenseDetailsComponent } from './components/sam/sam-licenses/license-details/license-details.component';
import { LicenseInfoComponent } from './components/sam/sam-licenses/license-info/license-info.component';
import { ContractInfoComponent } from './components/sam/sam-licenses/contract-info/contract-info.component';
import { FormsIoComponent } from './components/asset/forms-io/forms-io.component';
import { FormioModule } from 'angular-formio';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { EditAssetComponent } from './components/asset/asset-details/edit-asset/edit-asset.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { SamDashboardComponent } from './components/sam/sam-dashboard/sam-dashboard.component';
import {MatIconModule} from '@angular/material/icon';
import { HardwareDashboardComponent } from './components/asset/hardware-dashboard/hardware-dashboard.component';
import { AddNewSoftwareComponent } from './components/sam/sam-summary/add-new-software/add-new-software.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { AddNewLicenseComponent } from './components/sam/sam-licenses/add-new-license/add-new-license.component';
import {MatDialogModule, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { SoftwareSuiteDialogComponent } from './components/sam/sam-summary/software-suite-dialog/software-suite-dialog.component';
import { AddSoftwareSuiteDialogComponent } from './components/sam/sam-details/details/add-software-suite-dialog/add-software-suite-dialog.component';
import { EditSoftwareComponent } from './components/sam/sam-details/edit-software/edit-software.component';
import { IsEllipsisActiveDirective } from '../base/services/is-ellipsis-active.directive';
import { AssetFamilyDetailsDialogComponent } from './components/asset/hardware-dashboard/asset-family-details-dialog/asset-family-details-dialog.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ManageSoftwareConfigurationComponent } from './components/sam/sam-licenses/manage-software-configuration/manage-software-configuration.component';
import { LicenseToSoftwareMappingsComponent } from './components/sam/sam-licenses/license-to-software-mappings/license-to-software-mappings.component';
import { ExcludeAssetModelComponent } from './components/sam/sam-details/installations/exclude-asset-model/exclude-asset-model.component';
import { AssetHistoryModelComponent } from './components/asset/asset-details/asset-history-model/asset-history-model.component';
import { AssetHostDetailsComponent } from './components/asset/asset-details/asset-host-details/asset-host-details.component';
import { AddNewRelationshipModalComponent } from './components/asset/relationship/add-new-relationship-modal/add-new-relationship-modal.component';

@NgModule({
    imports: [
        CommonModule,
        BaseModule,
        RouterModule.forChild(ocsRoutes),
        TypeaheadModule.forRoot(),
        FormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatAutocompleteModule,
        MatSortModule,
        FormioModule,
        DragDropModule,
        HighchartsChartModule,
        MatSnackBarModule,
        MatDialogModule,
        MatIconModule,
        PaginationModule.forRoot(),
        AccordionModule.forRoot(),ModalModule.forRoot()
    ],
    declarations: [
        AssetComponent,DeltaComponent,TempComponent, AssetDetailsComponent, AdministrativeHardwareDataComponent, SoftwareComponent, RelationshipComponent, HardwareComponent,
        DeltaSoftwareComponent,TempAdministrativeHardwareDataComponent,TempAssetDetailsComponent,TempSoftwareComponent, ScanComponent,TempRelationshipComponent, SamComponent, SamSummaryComponent, SamLicensesComponent, SamDetailsComponent, DetailsComponent, LicensesComponent, InstallationsComponent, LicenseDetailsComponent, LicenseInfoComponent, ContractInfoComponent, FormsIoComponent, EditAssetComponent, SamDashboardComponent, HardwareDashboardComponent, AddNewSoftwareComponent, AddNewLicenseComponent, SoftwareSuiteDialogComponent, AddSoftwareSuiteDialogComponent, EditSoftwareComponent,IsEllipsisActiveDirective, AssetFamilyDetailsDialogComponent, ReportsComponent, ManageSoftwareConfigurationComponent, LicenseToSoftwareMappingsComponent, ExcludeAssetModelComponent,AssetHistoryModelComponent, AssetHostDetailsComponent, AddNewRelationshipModalComponent
    ],
    exports:[SoftwareSuiteDialogComponent, IsEllipsisActiveDirective],
    entryComponents: [SoftwareSuiteDialogComponent, AddSoftwareSuiteDialogComponent, AssetFamilyDetailsDialogComponent, ExcludeAssetModelComponent, AssetHistoryModelComponent, AssetHostDetailsComponent, AddNewRelationshipModalComponent],
    providers: [ OcsService,
        { provide: MAT_DIALOG_DATA, useValue: {} },
        { provide: MatDialogRef, useValue: {} } ]
})
export class OcsModule {}