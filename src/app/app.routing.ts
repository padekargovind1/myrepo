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
import { BrochureComponent } from './brochure/brochure.component';
import { EtablissementComponent } from './etablissement/etablissement.component';
import { CompareModeComponent } from './compare-mode/compare-mode.component';
import { DetailAppointmentComponent } from './detail-appointment/detail-appointment.component';
import { LandingPage1Component } from './landing-page-1/landing-page-1.component';
import { LandingPage3Component } from './landing-page-3/landing-page-3.component';
import { WizardComponent } from './wizard/wizard.component';
import { ApplytoComponent } from './applyto/applyto.component';
import { EditorialContComponent } from './editorial-cont/editorial-cont.component';
import { EditorialDetComponent } from './editorial-cont/editorial-det/editorial-det.component';
import { SchoolComponent } from './school/school.component';
import { RandomLandingComponent } from './random-landing/random-landing.component';

export const AppRoutes: Routes = [
    { path: '', component: RandomLandingComponent},
    { path: 'landing-page-1', component: AccueilComponent },
    { path: 'landing-page-2', component: LandingPage1Component},
    { path: 'landing-page-3', component: LandingPage3Component},
    { path: 'conseil', component: ConseilComponent},
    { path: 'booking' , component: BookingComponent },
    { path: 'linguistic' , component: LinguisticComponent },
    { path: 'register' , component: RegisterComponent },
    { path: 'login' , component: LoginComponent },
    { path: 'forgot-password' , component: ForgotpasswordComponent },
    { path: 'my-account' , component: MyaccountComponent },
    { path: 'school-calendar' , component: SchoolCalendarComponent },
    { path: 'brochure', component: BrochureComponent },
    { path: 'ecole', component: SchoolComponent },
    { path: 'college', component: SchoolComponent },
    { path: 'lycee', component: SchoolComponent },
    { path: 'internat', component: SchoolComponent },
    { path: 'enseignement', component: SchoolComponent },
    { path: 'etablissement/:schoolId', component: EtablissementComponent },
    { path: 'compare-mode', component: CompareModeComponent },
    { path: 'detail-appointment', component: DetailAppointmentComponent },
    { path: 'wizard', component: WizardComponent},
    { path: 'applyto/:schoolId', component: ApplytoComponent},
    { path: 'editorial', component: EditorialContComponent},
    { path: 'editorial-detail',component:EditorialDetComponent},
    { path: '**', redirectTo: ''}
]