const BASE_URL = "http://localhost:8082";
const BASE_URL_PY = "http://127.0.0.1:8000/";

export const API_URL = {
  AUTH: {
    LOGIN: `${BASE_URL}/user/login`,
    SIGNUP: `${BASE_URL}/user/signup`,
  },
  SPEECH_TEXT_API: {
    TEXT_CORRECTION: `${BASE_URL}/textCorrect/fixText`,
    ANALYZE_TEXT: `${BASE_URL_PY}/analyze-text`,
    GET_SUGGESTION: `${BASE_URL_PY}/get-suggestion`,
    AUDIO_ANALYZE: `${BASE_URL_PY}/analyze_audio`,
  },
};
