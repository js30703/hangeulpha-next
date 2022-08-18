


import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import * as machine from 'store/_localStorage';
import { auth as AuthApp, refreshTokenFirebase } from "_firebaseFront";
import solveUndefined from 'hooks/solveUndefined';

export interface AuthState {
  accessToken?: string;
  refreshToken?: string;
  expirationTime?: Number;
  displayName?:string;
  photoURL?:string;
}



const initialState:AuthState = {}

const oneHour = 60 * 60;
export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    loadToken: (state:AuthState)=>{
      const _token = machine.getToken()
      if (solveUndefined(_token?.expirationTime) < Date.now()) {
        refreshTokenFirebase().then(user=>{
          state.accessToken = user?.accessToken
          state.accessToken = user.stsTokenManager.accessToken;
          state.expirationTime = user.stsTokenManager.expirationTime;
        })
      } 
      return _token
    },
    saveToken: (state:AuthState, action:PayloadAction<AuthState>) => {
      machine.saveToken(action.payload)
      return action.payload
    },
    removeToken: (state:AuthState) => {
      machine.removeToken()
      return initialState
    },
    refreshToken: (state:AuthState) => {
      if (solveUndefined(state?.expirationTime) < Date.now()) {
      refreshTokenFirebase().then(user=>{
        state.accessToken = user?.accessToken
        state.accessToken = user.stsTokenManager.accessToken;
        state.expirationTime = user.stsTokenManager.expirationTime;
      })
    }
    },
  }
});

// Action creators are generated for each case reducer function
export const { loadToken ,saveToken, removeToken, refreshToken} = AuthSlice.actions;

export default AuthSlice.reducer;