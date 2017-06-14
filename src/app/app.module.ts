import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { HttpModule, Http , URLSearchParams} from '@angular/http';

import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { HomePageComponent } from './layouts/home/home-page.component';
import { SchoolModule} from './school/school.module';
import { UnConseilComponent } from './un-conseil/un-conseil.component';
import { BookingAppointmentComponent } from './booking-appointment/booking-appointment.component';
import { ScheduleModule} from 'primeng/primeng';
import { DialogModule,AutoCompleteModule} from 'primeng/primeng';
import { WizardComponent } from './wizard/wizard.component';
import { SchoolDetailComponent } from './school-detail/school-detail.component';
import { UnConseilService} from './services/un-conseil.service';
import { CompareModeComponent } from './compare-mode/compare-mode.component';
import {FormsModule} from '@angular/forms';

import { SharedService } from './services/shared.service';
import { LinguisticComponent } from './linguistic/linguistic.component';

import { reducer } from './app.reducers';

import { SharedModule } from './shared/index';
import { CoreModule } from './core/index';
import { StoreModule } from '@ngrx/store';










export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    UnConseilComponent,
    BookingAppointmentComponent,
    WizardComponent,
    SchoolDetailComponent,
    CompareModeComponent,
    LinguisticComponent,   
    
  ],
  imports: [
    DialogModule,
    AutoCompleteModule,    
    ScheduleModule,
    BrowserModule,
    BrowserAnimationsModule,    
    RouterModule.forRoot(AppRoutes),    
    HttpModule,
    FormsModule,   
    SchoolModule,
    StoreModule.provideStore(reducer),    
    CoreModule,
    SharedModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [Http]
    }),    
  ],
  providers: [UnConseilService,SharedService],
 // entryComponents: [ AdminLayoutComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }