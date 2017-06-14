import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { Router, NavigationEnd } from '@angular/router';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[HeaderComponent],
  declarations: [HeaderComponent]
})
export class HeaderModule {}