import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "constants";
import { fetcher } from "utils";

export const textCorrection = createAsyncThunk(
  "post/textCorrection",
  async ({ speechData }, { rejectWithValue }) => {
    const options = {
      method: "POST",
      url: `${API_URL.SPEECH_TEXT_API.TEXT_CORRECTION}?text=${speechData.text}&language=en-US`,
    };

    try {
      const data = await fetcher(options);
      return data;
    } catch (err) {
      console.log(err, "err1");
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const analyzeText = createAsyncThunk(
  "get/analyzeText",
  async ({ result }, { rejectWithValue }) => {
    const options = {
      url: `${API_URL.SPEECH_TEXT_API.ANALYZE_TEXT}?text=${result.correctText}`,
    };
    try {
      const data = await fetcher(options);
      return { ...data, ...result };
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const getSuggestion = createAsyncThunk(
  "get/getSuggestion",
  async ({ text }, { rejectWithValue }) => {
    const options = {
      url: `${API_URL.SPEECH_TEXT_API.GET_SUGGESTION}?text=${text}`,
    };
    try {
      const data = await fetcher(options);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const audioAnalyze = createAsyncThunk(
  "get/audioAnalyze",
  async ({ audioData }, { rejectWithValue }) => {
    const options = {
      url: `${API_URL.SPEECH_TEXT_API.AUDIO_ANALYZE}`,
      body: audioData,
    };
    try {
      const data = await fetcher(options);
      return data;
    } catch (err) {
      return rejectWithValue(err?.response?.data);
    }
  }
);
