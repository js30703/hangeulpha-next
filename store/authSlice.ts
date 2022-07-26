
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { removeToken, saveToken } from '_localStorage';

export interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  displayName?:string;
  photoURL?:string;
  expirationTime?:number;
}

const initialState:AuthState = {}


export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state:AuthState, action:PayloadAction<AuthState>) => {
      saveToken(action.payload)
      return action.payload
    },
    logout: (state) => {
      removeToken()
      return initialState
    },
    refreshToken: (state) => {
      console.log(state?.expirationTime)
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout, } = AuthSlice.actions;

export default AuthSlice.reducer;