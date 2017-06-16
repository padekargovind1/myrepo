import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule} from '@angular/forms';
import { HeaderModule } from '../layouts/header/header.module';
import { UnConseilComponent } from './un-conseil/un-conseil.component';
import { BookingAppointmentComponent } from './booking-appointment/booking-appointment.component';
import { WizardComponent  } from './wizard/wizard.component';
import { HttpModule, Http , URLSearchParams} from '@angular/http';
import { UnConseilRoutes as routes } from './un-conseil.routes';
import { ScheduleModule} from 'primeng/primeng';
import { DialogModule,AutoCompleteModule} from 'primeng/primeng';
import { UnConseilService} from '../core/services/un-conseil.service';
import { SharedService } from '../core/services/shared.service';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    HttpModule,
    AutoCompleteModule,    
    ScheduleModule,
    FormsModule,   
    RouterModule.forChild(routes),
  ],
  declarations: [
    UnConseilComponent,
    BookingAppointmentComponent,
    WizardComponent
  ],
  providers: [SharedService,UnConseilService],
})
export class UnConseilModule { }
