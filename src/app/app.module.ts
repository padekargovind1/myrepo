import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@angular/material';
import { HttpModule, Jsonp, JsonpModule } from '@angular/http';
import {
  MdCardModule, MdButtonModule, MdListModule,
  MdProgressBarModule, MdMenuModule, MdInputModule, MdRadioModule,
  MdToolbarModule, MdDatepickerModule, MdNativeDateModule, MdSelectModule, 
  MdIconModule, MdAutocompleteModule,MdTabsModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { FileUploadModule } from 'ng2-file-upload/ng2-file-upload';
import { SweetAlertService } from 'ng2-sweetalert2';

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
import { MysearchCardComponent } from './myaccount/myaccount-mysearch/mysearch-card/mysearch-card.component';
import { SchoolCalendarComponent } from './school-calendar/school-calendar.component';
import { CubeComponent } from './school-calendar/cube/cube.component';
import { FilterComponent } from './filter/filter.component';
import { BrochureComponent } from './brochure/brochure.component';
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
import { LandingPage3Component } from './landing-page-3/landing-page-3.component';
import { CompareBlockComponent } from './compare-mode/compare-block/compare-block.component';
import { WizardComponent } from './wizard/wizard.component';
import { BrochpopupComponent } from './brochure/brochpopup/brochpopup.component';
import { ApplytoComponent } from './applyto/applyto.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EditorialContComponent } from './editorial-cont/editorial-cont.component';
import {BrochureDownloadComponent} from './brochure/brochure-download/brochure-download.component';
import { EditorialDetComponent } from './editorial-cont/editorial-det/editorial-det.component';
import { SchoolComponent } from './school/school.component';

import { SchoolService } from './services/school.service';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { PublicService } from './services/public.service';
import { CompareService } from './services/compare.service';
import { BookingService } from './services/booking.service';
import { EditorService } from './services/editor.service';
import { BrochureService } from './services/brochure.service';
import { ShortenPipe } from './pipes/shorten.pipe';
import { SchoolPipe } from './pipes/school.pipe';
import { WishApplyPopupComponent } from './header/wish-apply-popup/wish-apply-popup.component';
import { RandomLandingComponent } from './random-landing/random-landing.component';

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
    LandingPage3Component,
    CompareBlockComponent,
    WizardComponent,
    BrochpopupComponent,
    BrochureDownloadComponent,
    ApplytoComponent,
    EditorialContComponent,
    EditorialDetComponent,
    SchoolComponent,
    ShortenPipe,
    SchoolPipe,
    MysearchCardComponent,
    WishApplyPopupComponent,
    RandomLandingComponent
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
    MdTabsModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    CustomFormsModule,
    FileUploadModule,
    NgxDatatableModule,
    JsonpModule
  ],
  providers: [
    SchoolService,
    RegisterComponent,
    AuthService,
    UsersService,
    PublicService,
    CompareService,
    BookingService,
    EditorService,
    SweetAlertService,
    BrochureService
  ],
    entryComponents: [
       BrochpopupComponent,
       BrochureDownloadComponent,
       WishApplyPopupComponent
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
