import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule, Http , URLSearchParams} from '@angular/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';
import { HomePageComponent } from './layouts/home/home-page.component';
import { LinguisticComponent } from './linguistic/linguistic.component';
import { reducer } from './app.reducers';
import { SharedModule } from './shared/index';
import { CoreModule } from './core/index';
import { StoreModule } from '@ngrx/store';
import { SchoolCalendarComponent } from './school-calendar/school-calendar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,   
    LinguisticComponent, SchoolCalendarComponent,    
  ],
  imports: [
    RouterModule,    
    BrowserModule,
    BrowserAnimationsModule,    
    RouterModule.forRoot(AppRoutes),
    HttpModule,
    StoreModule.provideStore(reducer),    
    CoreModule,
    SharedModule,
  ],
  providers: [], 
  bootstrap: [AppComponent]
})
export class AppModule { }