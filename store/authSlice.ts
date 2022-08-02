


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
    saveToken: (state:AuthState, action:PayloadAction<AuthState>) => {
      machine.saveToken(action.payload)
      return action.payload
    },
    removeToken: (state) => {
      machine.removeToken()
      return initialState
    },
    refreshToken: (state) => {
      refreshTokenFirebase().then(user=>{
        state.accessToken = user?.acceessToken
      })
    },
  }
});

// Action creators are generated for each case reducer function
export const { saveToken, removeToken,} = AuthSlice.actions;

export default AuthSlice.reducer;