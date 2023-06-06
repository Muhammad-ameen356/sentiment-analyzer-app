import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetcher } from "utils";

const login = createAsyncThunk("login/post", async (body, { rejectWithValue }) => {
  const options = {
    url: "API_URL.LOGIN_URL",
    body,
  };
  try {
    const data = await fetcher(options);
    return data;
  } catch (err) {
    return rejectWithValue(err?.response?.data);
  }
});

export { login };
