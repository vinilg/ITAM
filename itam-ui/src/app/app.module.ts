import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { BaseModule } from './base/base.module';
import { AppRoutes } from './app.route';
import { RouterModule } from '@angular/router';
import { AppService } from './app.service';
import { OcsComponent } from './ocs/ocs.component';
import { PaginationModule } from 'ngx-bootstrap';
import { FormioModule } from 'angular-formio';
import { HighchartsChartModule } from 'highcharts-angular';

@NgModule({
  declarations: [
    AppComponent,
    OcsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    BaseModule,
    FormioModule,
    RouterModule.forRoot(AppRoutes, { useHash: true, onSameUrlNavigation: "reload" }),
    PaginationModule.forRoot(),
    HighchartsChartModule
  ],
  providers: [AppService],
  exports:[],
  bootstrap: [AppComponent]
})
export class AppModule { }
