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
import { BrochureComponent } from './brochure/brochure.component';
import { EcoleComponent } from './ecole/ecole.component';
import { CollegeComponent } from './college/college.component';
import { LyceeComponent } from './lycee/lycee.component';
import { EtablissementComponent } from './etablissement/etablissement.component';
import { CompareModeComponent } from './compare-mode/compare-mode.component';

export const AppRoutes: Routes = [
    { path: '', component: AccueilComponent},
    { path: 'conseil', component: ConseilComponent},
    { path: 'internat', component: ConseilComponent},
    { path: 'booking' , component: BookingComponent },
    { path: 'linguistic' , component: LinguisticComponent },
    { path: 'register' , component: RegisterComponent },
    { path: 'login' , component: LoginComponent },
    { path: 'forgot-password' , component: ForgotpasswordComponent },
    { path: 'my-account' , component: MyaccountComponent },
    { path: 'school-calendar' , component: SchoolCalendarComponent },
    { path: 'schools', component: SchoolsComponent },
    { path: 'brochure', component: BrochureComponent },
    { path: 'ecole', component: EcoleComponent },
    { path: 'college', component: CollegeComponent },
    { path: 'lycee', component: LyceeComponent },
    { path: 'etablissement', component: EtablissementComponent },
    { path: 'compare-mode', component: CompareModeComponent },
    { path: '**', redirectTo: ''}
]