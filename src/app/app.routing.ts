import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { ConseilComponent } from './conseil/conseil.component';

export const AppRoutes: Routes = [
    { path: '', component: AccueilComponent},
    { path: 'conseil', component: ConseilComponent},
    { path: '**', redirectTo: ''}
]