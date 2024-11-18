import { createAction, props } from '@ngrx/store';
import { SessionData } from '../../interfaces/interfaces';

export const login = createAction(
  '[user] Login',
  props<SessionData>()
);

export const logout = createAction('[user] Logout');
