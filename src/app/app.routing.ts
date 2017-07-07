import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConseilComponent } from './conseil/conseil.component';
import { BookingComponent } from './booking/booking.component';
import { LinguisticComponent } from './linguistic/linguistic.component';

export const AppRoutes: Routes = [
    { path: '', component: AccueilComponent},
    { path: 'conseil', component: ConseilComponent},
    { path: 'booking' , component: BookingComponent },
    { path: 'linguistic' , component: LinguisticComponent },
    { path: '**', redirectTo: ''}
]