import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolComponent } from './school/school.component';
import { SchoolDetailComponent } from './school-detail/school-detail.component';
import { CompareModeComponent } from './compare-mode/compare-mode.component';
import {DialogModule,AutoCompleteModule,PaginatorModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderModule } from '../layouts/header/header.module';
import { SchoolRoutes as routes } from './school.routes';

@NgModule({
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    PaginatorModule,
    RouterModule.forChild(routes),
    HeaderModule   
  ],
  declarations: [
    SchoolComponent,
    SchoolDetailComponent,
    CompareModeComponent
    ],
  
})
export class SchoolModule { }