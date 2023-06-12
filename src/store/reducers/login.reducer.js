import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { login, signup } from "store/actions";

const initialState = {
  isLoading: false,
  errorMessage: "",
  successMessage: "",
  userData: {},
  isLoggedIn: true,
};

const LoginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    userLogout: (state) => {
      state.isLoggedIn = false;
      state.userData = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, { payload }) => {
      state.userData = payload;
      state.isLoading = false;
      state.isLoggedIn = true;
    });
    builder.addCase(signup.fulfilled, (state, { payload }) => {
      state.userData = payload;
      state.isLoading = false;
      state.isLoggedIn = true;
    });

    builder.addMatcher(isAnyOf(login.pending, signup.pending), (state) => {
      state.isLoading = true;
    });
    builder.addMatcher(isAnyOf(login.rejected, signup.rejected), (state, { payload }) => {
      state.isLoading = false;
      console.log(payload, "payload");
    });
  },
});
export const { userLogout } = LoginReducer.actions;
export default LoginReducer.reducer;
