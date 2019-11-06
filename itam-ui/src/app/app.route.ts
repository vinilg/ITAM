import { Routes } from '@angular/router';


export const AppRoutes: Routes = [
  {path: '', redirectTo: 'ocs/dashboard', pathMatch: 'full'},
//  { path: 'configurations', loadChildren: './configurations/configurations.module#ConfigurationModule' },
  { path: 'ocs', loadChildren: './ocs/ocs.module#OcsModule' }
];