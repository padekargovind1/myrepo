import { AuthState } from './auth/reducers/auth.state';
//import { UserState } from './user/reducers/user.state';
// This should hold the AppState interface
// Ideally importing all the substate for the application
/**
 *
 *
 * @export
 * @interface AppState
 */
export interface AppState {
  
  auth: AuthState;
  
  //users: UserState;  
}
