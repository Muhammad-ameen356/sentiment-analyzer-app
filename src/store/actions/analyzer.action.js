import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_URL } from "constants";
import { Alert } from "react-native";
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
      Alert.alert(err.code, err.message);
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
      Alert.alert(err.code, err.message);
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
      Alert.alert(err.code, err.message);
      return rejectWithValue(err?.response?.data);
    }
  }
);

export const audioAnalyze = createAsyncThunk(
  "get/audioAnalyze",
  async ({ audioData }, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append("audio", audioData);

      const options = {
        url: `${API_URL.SPEECH_TEXT_API.AUDIO_ANALYZE}`,
        method: "POST",
        body: formData,
      };

      const response = await fetch(options);
      return response;
    } catch (err) {
      Alert.alert(err.code, err.message);
      return rejectWithValue(err?.response?.data);
    }
  }
);
