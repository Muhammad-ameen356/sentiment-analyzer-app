import { isIos } from "constants";
import { PERMISSIONS, RESULTS, request } from "react-native-permissions";

export const microphonePermission = async () => {
  try {
    if (isIos) {
      const granted = await request(PERMISSIONS.IOS.MICROPHONE);
      const speechRecognition = await request(PERMISSIONS.IOS.SPEECH_RECOGNITION);

      if (granted === RESULTS.GRANTED && speechRecognition === RESULTS.GRANTED) {
        return true;
      }
      return false;
    }
    const granted = await request(PERMISSIONS.ANDROID.RECORD_AUDIO, {
      title: "Sentiment Analyzer",
      message: "This feature want to access your Microphone",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK",
    });
    if (granted === RESULTS.GRANTED) {
      return true;
    }
    return false;
  } catch (err) {
    return false;
  }
};
