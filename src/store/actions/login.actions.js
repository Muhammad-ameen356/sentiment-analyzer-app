import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "constants";
import { fetcher } from "utils";

export const login = createAsyncThunk("post/login", async ({ userData }, { rejectWithValue }) => {
  const options = {
    method: "POST",
    url: `${API_URL.AUTH.LOGIN}?email=${userData.email}&password=${userData.password}`,
  };

  try {
    const data = await fetcher(options);
    return { ...data, password: userData.password };
  } catch (err) {
    return rejectWithValue(err?.response?.data);
  }
});

export const signup = createAsyncThunk("post/signup", async ({ userData }, { rejectWithValue }) => {
  const options = {
    method: "POST",
    url: API_URL.AUTH.SIGNUP,
    data: userData,
  };

  try {
    const data = await fetcher(options);
    return { ...data, password: userData.password };
  } catch (err) {
    return rejectWithValue(err?.response?.data);
  }
});
