import { createReducer, on } from '@ngrx/store';
import { initialUserState, UserState } from './user.state';
import { login, logout } from './user.actions';

export const userReducer = createReducer(
    initialUserState,
  on(login, (state,user) => {
    return {user}
  }),
  on(logout, () => initialUserState)
);
