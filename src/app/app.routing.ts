import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConseilComponent } from './conseil/conseil.component';
import { BookingComponent } from './booking/booking.component';
import { LinguisticComponent } from './linguistic/linguistic.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { SchoolCalendarComponent } from './school-calendar/school-calendar.component';
import { SchoolsComponent } from './schools/schools.component';

export const AppRoutes: Routes = [
    { path: '', component: AccueilComponent},
    { path: 'conseil', component: ConseilComponent},
    { path: 'booking' , component: BookingComponent },
    { path: 'linguistic' , component: LinguisticComponent },
    { path: 'register' , component: RegisterComponent },
    { path: 'login' , component: LoginComponent },
    { path: 'forgot-password' , component: ForgotpasswordComponent },
    { path: 'my-account' , component: MyaccountComponent },
    { path: 'school-calendar' , component: SchoolCalendarComponent },
    { path: 'schools', component: SchoolsComponent }
    // { path: '**', redirectTo: ''}
]