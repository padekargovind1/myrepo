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
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';

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
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { MyaccountParentsComponent } from './myaccount/myaccount-parents/myaccount-parents.component';
import { MyaccountChildrenComponent } from './myaccount/myaccount-children/myaccount-children.component';
import { MyaccountDocumentationsComponent } from './myaccount/myaccount-documentations/myaccount-documentations.component';
import { MyaccountMysearchComponent } from './myaccount/myaccount-mysearch/myaccount-mysearch.component';
import { SchoolCalendarComponent } from './school-calendar/school-calendar.component';
import { CubeComponent } from './school-calendar/cube/cube.component';

import { SchoolService } from './services/school.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

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
    RegisterComponent,
    LoginComponent,
    ForgotpasswordComponent,
    MyaccountComponent,
    MyaccountParentsComponent,
    MyaccountChildrenComponent,
    MyaccountDocumentationsComponent,
    MyaccountMysearchComponent,
    SchoolCalendarComponent,
    CubeComponent,
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
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule
  ],
  providers: [
    SchoolService,
    RegisterComponent,
    AuthService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
