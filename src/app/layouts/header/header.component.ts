import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../interfaces';
import { getAuthStatus } from '../../auth/reducers/selectors';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../core/services/auth.service';
import { AuthActions } from '../../auth/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
isAuthenticated: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private authActions: AuthActions,
  ) { }

  ngOnInit() {
   // this.store.dispatch(this.authActions.authorize());
    //this.isAuthenticated = this.store.select(getAuthStatus);
  }

  logout() {
    this.authService.logout().subscribe(
      data => console.log(data)
    );
  }

}
