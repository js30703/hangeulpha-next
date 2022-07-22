
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken?: String;
  refreshToken?: String;
  displayName?:String;
  photoUrl?:String;
  expirationTime?:number;
}

const initialState:AuthState = {}


export const AuthSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    login: (state:AuthState, action:PayloadAction<AuthState>) => {
      localStorage.setItem('@hangeulpha',String(action.payload.refreshToken))
      return action.payload
    },
    logout: (state) => {
      localStorage.removeItem("@hangeulpha");
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