import {
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData
} from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie } from '../utils/cookie';

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) =>
    await loginUserApi({ email, password })
);

export const registerUser = createAsyncThunk(
  'user/registration',
  async ({ email, name, password }: TRegisterData) =>
    await registerUserApi({ email, name, password })
);

interface IUserState {
  isAuthChecked: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
}

const initialState: IUserState = {
  isAuthChecked: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLogout: (state) => {
      state.data = null;
    }
  },
  selectors: {
    isAuthCheckedSelector: (state) => state.loginUserRequest,
    userDataSelector: (state) => state.data,
    loginErrorSelector: (state) => state.loginUserError
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loginUserRequest = true;
      state.loginUserError = null;
    }),
      builder.addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message!;
        state.isAuthChecked = true;
      }),
      builder.addCase(loginUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      });
    builder.addCase(registerUser.pending, (state) => {
      state.loginUserRequest = true;
      state.loginUserError = null;
    }),
      builder.addCase(registerUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message!;
      }),
      builder.addCase(registerUser.fulfilled, (state, action) => {
        state.data = action.payload.user;
        state.loginUserRequest = false;
        state.isAuthChecked = true;
      });
  }
});

export const { userLogout } = userSlice.actions;
export const { isAuthCheckedSelector, userDataSelector, loginErrorSelector } =
  userSlice.selectors;

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.clear();
        deleteCookie('accessToken');
        dispatch(userLogout());
      })
      .catch(() => {});
  }
);
