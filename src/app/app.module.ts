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
  MdIconModule, MdAutocompleteModule
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
import { FilterComponent } from './filter/filter.component';
import { SchoolService } from './services/school.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { PublicService } from './services/public.service';
import { BrochureComponent } from './brochure/brochure.component';
import { EcoleComponent } from './ecole/ecole.component';
import { CollegeComponent } from './college/college.component';
import { LyceeComponent } from './lycee/lycee.component';
import { EtablissementComponent } from './etablissement/etablissement.component';
import { CompareModeComponent } from './compare-mode/compare-mode.component';
import { DetailAppointmentComponent } from './detail-appointment/detail-appointment.component';
import { SchoolCardComponent } from './shared/school-card/school-card.component';
import { LandingPage1Component } from './landing-page-1/landing-page-1.component';
import { EtablissementEssentielComponent } from './etablissement/etablissement-essentiel/etablissement-essentiel.component';
import { EtablissementFormationComponent } from './etablissement/etablissement-formation/etablissement-formation.component';
import { EtablissementEvenementComponent } from './etablissement/etablissement-evenement/etablissement-evenement.component';
import { EtablissementFaqComponent } from './etablissement/etablissement-faq/etablissement-faq.component';
import { EtablissementVideoComponent } from './etablissement/etablissement-video/etablissement-video.component';
import { EtablissementAssoComponent } from './etablissement/etablissement-asso/etablissement-asso.component';
import { EtablissementInfoComponent } from './etablissement/etablissement-info/etablissement-info.component';
import { EtablissementArticlesComponent } from './etablissement/etablissement-articles/etablissement-articles.component';
import { EtablissementMediaComponent } from './etablissement/etablissement-media/etablissement-media.component';
import { BrochureCardComponent } from './brochure/brochure-card/brochure-card.component';
import { LandingPage3Component } from './landing-page-3/landing-page-3.component';
import { CompareBlockComponent } from './compare-mode/compare-block/compare-block.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    ConseilComponent,
    HeaderComponent,
    BookingComponent,
    LinguisticComponent,
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
    FilterComponent,
    BrochureComponent,
    EcoleComponent,
    CollegeComponent,
    LyceeComponent,
    EtablissementComponent,
    CompareModeComponent,
    DetailAppointmentComponent,
    SchoolCardComponent,
    LandingPage1Component,
    EtablissementEssentielComponent,
    EtablissementFormationComponent,
    EtablissementEvenementComponent,
    EtablissementFaqComponent,
    EtablissementVideoComponent,
    EtablissementAssoComponent,
    EtablissementInfoComponent,
    EtablissementArticlesComponent,
    EtablissementMediaComponent,
    BrochureCardComponent,
    LandingPage3Component,
    CompareBlockComponent
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
    UsersService,
    PublicService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
