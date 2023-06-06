import { createSlice } from "@reduxjs/toolkit";
import { login } from "store/actions";

const initialState = {
  isLoading: false,
  errorMessage: "",
  successMessage: "",
  isLogin: false,
};

const LoginReducer = createSlice({
  name: "login",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(login.fulfilled, (state) => {
      state.isLoading = false;
      state.isLogin = true;
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default LoginReducer.reducer;
