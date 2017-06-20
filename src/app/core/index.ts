import { NgModule } from '@angular/core';
import { HttpModule, XHRBackend, RequestOptions, Http } from '@angular/http';
// Components

// Services
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http';

import { AuthActions } from '../auth/actions/auth.actions';


import { EffectsModule } from '@ngrx/effects';
import { AuthenticationEffects } from '../auth/effects/auth.effects';

import { CanActivateViaAuthGuard } from './guards/auth.guard';
import 'rxjs';

export function httpInterceptor(
  backend: XHRBackend,
  defaultOptions: RequestOptions,
) {
  return new HttpService(backend, defaultOptions);
}

@NgModule({
  declarations: [ ],
  exports: [ ],
  imports: [
    
    EffectsModule.run(AuthenticationEffects),    
  ],
  providers: [    
    AuthService,
    {
      provide: HttpService,
      useFactory: httpInterceptor,
      deps: [ XHRBackend, RequestOptions]
    },    
    AuthActions,    
    CanActivateViaAuthGuard
  ]
})
export class CoreModule {}