import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchoolComponent } from './school.component';
import {DialogModule,AutoCompleteModule} from 'primeng/primeng';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    AutoCompleteModule,
    FormsModule
  ],
  declarations: [SchoolComponent]
})
export class SchoolModule { }
