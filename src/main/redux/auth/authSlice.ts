import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store/store';

interface AuthState {
  isLoggedIn: boolean,
  userData: any
}

const initialState: AuthState = {
  isLoggedIn: false,
  userData: {}
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginAction: (state, action) => {
      return (state = {
        ...state,
        isLoggedIn: true,
        userData: action.payload
      });
    },
    logoutAction: (state) => {
      return (state = {
        ...state,
        isLoggedIn: false,
        userData: {}
      });
    }
  }
});

export const {
  loginAction,
  logoutAction
} = authSlice.actions;

export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;

export const selectUserToken = (state: RootState) => {
  if (selectIsLoggedIn(state) && Object.keys(state.auth.userData).length) {
    return state.auth.userData.token;
  }
  return false;
};

export const selectUserData = (state: RootState) => {
  if (selectIsLoggedIn(state) && Object.keys(state.auth.userData).length) {
    return state.auth.userData;
  }
  return false;
};

export default authSlice.reducer;
