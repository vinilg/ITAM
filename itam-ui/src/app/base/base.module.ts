import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HttpService } from './services/http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { MatCheckboxModule, MatTabsModule, MatRadioModule, MatDatepickerModule, MatNativeDateModule,MatFormFieldModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatStepperModule,MatSelectModule,MatMenuModule } from '@angular/material';
import { TableHeaderComponent } from './components/table-header/table-header.component';
import { PaginationModule } from 'ngx-bootstrap';
import { TokenInterceptor } from './services/http-interceptor';
import { MatDialogModule,MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import { ExportExcelService } from './services/export-excel.services';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatStepperModule,
    PaginationModule,
    MatSelectModule,
    SelectDropDownModule
    ],
  exports: [
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    MatDialogModule,
    MatCheckboxModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatStepperModule,
    TableHeaderComponent,
    MatSelectModule,
    SelectDropDownModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    TableHeaderComponent
  ],
  entryComponents:[
  ],
  providers: [
    HttpService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
  },
  ExportExcelService
  ]
})
export class BaseModule { }
