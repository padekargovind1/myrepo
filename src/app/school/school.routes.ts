import { SchoolComponent } from './school/school.component';
import { SchoolDetailComponent } from './school-detail/school-detail.component';
import { CompareModeComponent  } from './compare-mode/compare-mode.component'

export const SchoolRoutes = [
  { path: '', redirectTo: 'une-ecole', pathMatch: 'full' },
  { path: 'une-ecole', component: SchoolComponent },
  { path: 'un-lycee', component: SchoolComponent },
  { path: 'un-college', component: SchoolComponent },
  { path: 'school-details/:id', component: SchoolDetailComponent },
  { path: 'compare-mode', component: CompareModeComponent },
];
