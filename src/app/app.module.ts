import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import {
  MdCardModule, MdButtonModule, MdListModule,
  MdProgressBarModule, MdMenuModule, MdInputModule, MdRadioModule,
  MdToolbarModule, MdDatepickerModule, MdNativeDateModule, MdSelectModule, 
  MdIconModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';

import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { ConseilComponent } from './conseil/conseil.component';
import { AppRoutes } from './app.routing';
import { HeaderComponent } from './header/header.component';
import { BookingComponent } from './booking/booking.component';
import { LinguisticComponent } from './linguistic/linguistic.component';
import { MenuComponent } from './menu/menu.component';
import { LinguisticTripsComponent } from './linguistic/linguistic-trips/linguistic-trips.component';
import { SchoolService } from './services/school.service';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ConseilComponent,
    HeaderComponent,
    BookingComponent,
    LinguisticComponent,
    MenuComponent,
    LinguisticTripsComponent,
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FlexLayoutModule,
    MdIconModule, 
    MdCardModule, 
    MdButtonModule, 
    MdListModule,
    MdProgressBarModule, 
    MdMenuModule, 
    MdInputModule, 
    MdRadioModule,
    MdToolbarModule, 
    MdDatepickerModule, 
    MdNativeDateModule, 
    MdSelectModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule
  ],
  providers: [SchoolService],
  bootstrap: [AppComponent]
})
export class AppModule { }
