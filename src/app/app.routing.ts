import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './layouts/home/home-page.component';
import { LinguisticComponent } from './linguistic/linguistic.component';


export const AppRoutes: Routes = [
{ path: '', component: HomePageComponent},
{ path: 'linguistic', component: LinguisticComponent },
{ path: 'un-conseil', loadChildren: './un-conseil/un-conseil.module#UnConseilModule' },
{ path: 'un-lycee', loadChildren: './school/school.module#SchoolModule' },
{ path: 'une-ecole', loadChildren: './school/school.module#SchoolModule' },
{ path: 'un-college', loadChildren: './school/school.module#SchoolModule' },
{ path: 'auth', loadChildren: './auth/auth.module#AuthModule' } 
];