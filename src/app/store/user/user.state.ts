import { SessionData } from "../../interfaces/interfaces";

export interface UserState {
    user: SessionData | null;
  }
  
  export const initialUserState: UserState = {
    user: null,
  };