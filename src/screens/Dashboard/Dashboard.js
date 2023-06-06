import { BaseSafeAreaView } from "components";
import { theme, micIcon, unitedFlag } from "constants";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Voice from "@react-native-voice/voice";
import { useEffect, useState } from "react";
import { microphonePermission } from "utils";

const Dashboard = () => {
  const [isRecordingStart, setIsRecordingStart] = useState(false);
  const [resultState, setResultState] = useState("");

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChangedHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  Voice.onSpeechResults = (result) => setResultState(result.value[0]);
  Voice.onSpeechEnd = () => setIsRecordingStart(false);

  console.log(resultState, "resultState");

  const onSpeechStartHandler = (e) => {
    console.log(e, "start");
  };

  const onSpeechEndHandler = (e) => {
    console.log(e, "end");
  };

  const onSpeechResultsHandler = (e) => {
    console.log(e, "result");
  };

  const startRecording = async () => {
    const permissionResult = await microphonePermission();

    if (permissionResult) {
      try {
        await Voice.start("en-Us");
        setIsRecordingStart(true);
      } catch (error) {
        setIsRecordingStart(false);
        console.log(error);
      }
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecordingStart(false);
      await Voice.stop();
    } catch (error) {
      setIsRecordingStart(false);
      console.log(error);
    }
  };

  const onSpeechVolumeChangedHandler = (e) => {
    console.log("onSpeechVolumeChanged: ", e);
  };

  return (
    <View style={styles.main}>
      <BaseSafeAreaView>
        <View>
          <View style={styles.firstContainer}>
            <Text style={styles.firstContainerText}>
              {isRecordingStart ? "Listening..." : "Analyze your audio"}
            </Text>
          </View>
          <View style={styles.secondContainer}>
            <View style={styles.box1}>
              <View style={styles.flag_language}>
                <Image style={styles.flag_language_image} source={unitedFlag} />
                <Text style={styles.flag_language_text}>English</Text>
              </View>
              <View style={styles.second_inner_box}>
                <Text style={styles.box1Text}>We Say What we think, right</Text>
              </View>
            </View>
          </View>
          <View style={styles.thirdContainer}>
            <View style={styles.historyBTN}>
              <Text style={styles.history_text}>History</Text>
              <TouchableOpacity>
                <Text style={styles.history_text}>View all</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.resultBoxMain} />
          </View>
          <View style={styles.fourthContainer}>
            <TouchableOpacity onPress={isRecordingStart ? stopRecording : startRecording}>
              <View style={styles.micIconBox}>
                {isRecordingStart ? (
                  <View style={styles.stopMicIcon} />
                ) : (
                  <Image style={styles.micIcon} source={micIcon} />
                )}
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BaseSafeAreaView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  main: {
    backgroundColor: theme.main_black,
    flex: 1,
  },
  firstContainer: {
    height: "5%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  secondContainer: {
    height: "45%",
  },
  thirdContainer: {
    height: "30%",
  },
  fourthContainer: {
    height: "20%",
    justifyContent: "center",
    alignItems: "center",
  },
  firstContainerText: {
    fontSize: 18,
    color: theme.secondary_color,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  box1: {
    height: "85%",
    margin: 30,
    backgroundColor: theme.primary_color,
    borderRadius: 15,
    padding: 20,
  },
  box1Text: {
    fontSize: 26,
    textAlign: "center",
    fontWeight: "bold",
    color: theme.primary_text_color,
  },
  resultBoxMain: {
    height: "80%",
    marginLeft: 30,
    marginRight: 30,
    backgroundColor: theme.primary_color,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  micIconBox: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: theme.secondary_color,
  },
  micIcon: { width: "50%", height: "50%", borderRadius: 100 },
  stopMicIcon: {
    width: "25%",
    height: "25%",
    borderRadius: 3,
    backgroundColor: theme.white_color,
  },

  flag_language: {
    height: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10%",
  },
  flag_language_image: {
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: "white",
    marginRight: 30,
  },
  flag_language_text: {
    color: theme.white_color,
    fontSize: 16,
  },
  second_inner_box: {
    height: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
  historyBTN: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginRight: 24,
    marginLeft: 24,
    marginTop: 8,
    marginBottom: 8,
    height: "10%",
  },
  history_text: {
    color: theme.white_color,
    fontSize: 16,
  },
});
