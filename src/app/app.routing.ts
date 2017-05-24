import { Routes } from '@angular/router';

import { HomePageComponent } from './layouts/home/home-page.component';
import { SchoolComponent } from './school/school.component';
import { UnConseilComponent } from './un-conseil/un-conseil.component';
import { BookingAppointmentComponent } from './booking-appointment/booking-appointment.component';
import { SchoolDetailComponent } from './school-detail/school-detail.component';

export const AppRoutes: Routes = [{
  path: '',
  redirectTo: 'home',
  pathMatch: 'full',
}, {
  path: '',
  component: HomePageComponent,
  
},
{
  path: 'school',
  component: SchoolComponent,  
},
{
  path: 'un-conseil',
  component: UnConseilComponent,  
},
{
  path: 'booking-appointment',
  component: BookingAppointmentComponent,  
},
{ path: 'school-details/:id',
 component: SchoolDetailComponent }
];