import { UnConseilComponent } from './un-conseil/un-conseil.component';
import { BookingAppointmentComponent } from './booking-appointment/booking-appointment.component';
import { WizardComponent  } from './wizard/wizard.component';

export const UnConseilRoutes = [
  { path: '', component: UnConseilComponent},
  { path: 'un-conseil', component: UnConseilComponent },
  { path: 'booking-appointment/:id', component: BookingAppointmentComponent },
  { path: 'wizard/:id/:id2', component: WizardComponent }, 
];
