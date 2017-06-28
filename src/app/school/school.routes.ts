import { SchoolComponent } from './school/school.component';
import { SchoolDetailComponent } from './school-detail/school-detail.component';
import { CompareModeComponent  } from './compare-mode/compare-mode.component'
import { CanActivateViaAuthGuard } from '../core/guards/auth.guard';

export const SchoolRoutes = [
  { path: '', component: SchoolComponent , pathMatch: 'full' },
  { path: 'une-ecole', component: SchoolComponent },
  { path: 'un-lycee', component: SchoolComponent },
  { path: 'un-college', component: SchoolComponent },
  { path: 'school-details/:id',
   component: SchoolDetailComponent,
   canActivate: [ CanActivateViaAuthGuard ]
   },
  { path: 'compare-mode', component: CompareModeComponent },
];
