import { Routes } from '@angular/router';
import { AssetComponent } from './components/asset/asset.component';
import { DeltaComponent } from './components/delta/delta.component';
import { TempComponent } from './components/temp/temp.component';
import { AssetDetailsComponent } from './components/asset/asset-details/asset-details.component';
import { TempAssetDetailsComponent } from './components/temp/asset-details/asset-details.component';
import { SamSummaryComponent } from './components/sam/sam-summary/sam-summary.component';
import { SamDetailsComponent } from './components/sam/sam-details/sam-details.component';
import { SamLicensesComponent } from './components/sam/sam-licenses/sam-licenses.component';
import { LicenseDetailsComponent } from './components/sam/sam-licenses/license-details/license-details.component';
import { EditAssetComponent } from './components/asset/asset-details/edit-asset/edit-asset.component';
import { SamDashboardComponent } from './components/sam/sam-dashboard/sam-dashboard.component';
import { HardwareDashboardComponent } from './components/asset/hardware-dashboard/hardware-dashboard.component';
import { AddNewSoftwareComponent } from './components/sam/sam-summary/add-new-software/add-new-software.component';
import { AddNewLicenseComponent } from './components/sam/sam-licenses/add-new-license/add-new-license.component';
import { ReportsComponent } from './components/reports/reports.component';
import { ManageSoftwareConfigurationComponent } from './components/sam/sam-licenses/manage-software-configuration/manage-software-configuration.component';

export const ocsRoutes: Routes = [
    { path: 'dashboard', component: HardwareDashboardComponent},
    { path: 'asset', component: AssetComponent},
    { path: 'reports', component: ReportsComponent},
    { path: 'delta', component: DeltaComponent},
    { path: 'temp', component: TempComponent},
    { path: 'sam-dashboard', component: SamDashboardComponent},
    { path: 'sam', component: SamSummaryComponent},
    { path: 'sam/add', component: AddNewSoftwareComponent},
    { path: 'sam/licenses', component: SamLicensesComponent},
    { path: 'sam/licenses/add', component: AddNewLicenseComponent},
    { path: 'sam/licenses/edit/:id', component: AddNewLicenseComponent},
    { path: 'sam/license-details/:id', component: LicenseDetailsComponent},
    { path: 'sam-details/:id', component: SamDetailsComponent},
    { path: 'asset-details/:id', component: AssetDetailsComponent},
    { path: 'temp-asset-details/:id', component: TempAssetDetailsComponent},
    { path: 'sam/config', component: ManageSoftwareConfigurationComponent}, 
]