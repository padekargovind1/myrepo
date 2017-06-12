import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolComponent } from './school.component';
import {DialogModule,AutoCompleteModule,PaginatorModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {HeaderComponent} from '../layouts/header/header.component';



@NgModule({
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule,
    PaginatorModule,
    RouterModule,   
    /*HeaderModule,*/
  ],
  declarations: [SchoolComponent,HeaderComponent],
  
})
export class SchoolModule { }
