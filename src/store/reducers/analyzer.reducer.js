import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { analyzeText, audioAnalyze, getSuggestion, textCorrection } from "store/actions";

const initialState = {
  isLoading: false,
  textAnalyzeResult: [],
  voiceAnalyzeResult: [],
  isLoggedIn: false,
};

const AnalyzerReducer = createSlice({
  name: "analyzer",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    builder.addCase(textCorrection.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.correctedText = payload;
    });
    builder.addCase(analyzeText.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.textAnalyzeResult.unshift(payload);
    });
    builder.addCase(getSuggestion.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.textAnalyzeResult.unshift(payload);
    });
    builder.addCase(audioAnalyze.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.voiceAnalyzeResult.unshift(payload);
    });

    builder.addMatcher(
      isAnyOf(
        textCorrection.pending,
        analyzeText.pending,
        getSuggestion.pending,
        audioAnalyze.pending
      ),
      (state) => {
        state.isLoading = true;
      }
    );
    builder.addMatcher(
      isAnyOf(
        textCorrection.rejected,
        analyzeText.rejected,
        getSuggestion.rejected,
        audioAnalyze.rejected
      ),
      (state) => {
        state.isLoading = false;
      }
    );
  },
});
export const { audioAnalyzeData } = AnalyzerReducer.actions;
export default AnalyzerReducer.reducer;
