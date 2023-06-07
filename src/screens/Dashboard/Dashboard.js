/* eslint-disable no-unused-vars */
import { BaseSafeAreaView } from "components";
import { theme, micIcon, unitedFlag } from "constants";
import {
  Button,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Voice from "@react-native-voice/voice";
import { useEffect, useId, useState } from "react";
import { microphonePermission, multiplePermissionForRecordAudio } from "utils";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import RNFetchBlob from "rn-fetch-blob";

const audioRecorderPlayer = new AudioRecorderPlayer();

const Dashboard = () => {
  const [isRecordingStart, setIsRecordingStart] = useState(false);
  const [resultState, setResultState] = useState("");
  const [state, setState] = useState();
  const uniqueId = useId();

  const { dirs } = RNFetchBlob.fs;
  const path = Platform.select({
    ios: "hello.m4a",
    android: `${dirs.CacheDir}/${uniqueId}_analyzer.mp3`,
  });

  const onRecordingStart = () => {
    setIsRecordingStart(true);
  };

  const onRecordingEnd = () => {
    setIsRecordingStart(false);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStartHandler;
    Voice.onSpeechEnd = onSpeechEndHandler;
    Voice.onSpeechResults = onSpeechResultsHandler;
    Voice.onSpeechVolumeChanged = onSpeechVolumeChangedHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechStartHandler = (e) => {
    console.log(e, "start");
  };

  const onSpeechEndHandler = (e) => {
    console.log(e, "end");
    onRecordingEnd();
  };

  const onSpeechResultsHandler = (e) => {
    console.log(e, "result");
  };

  const onSpeechVolumeChangedHandler = (e) => {
    // console.log("onSpeechVolumeChanged: ", e);
  };

  const startRecognizing = async () => {
    const permissionResult = await microphonePermission();
    if (permissionResult) {
      try {
        await Voice.start("en-Us");
        onRecordingStart();
      } catch (error) {
        onRecordingEnd();
        console.log(error);
      }
    }
  };

  const stopRecognizing = async () => {
    try {
      await Voice.stop();
    } catch (error) {
      console.log(error);
    } finally {
      onRecordingEnd();
    }
  };

  // For Recording

  // const startRecording = async () => {
  //   onRecordingStart();

  //   const recordPermission = await multiplePermissionForRecordAudio();
  //   console.log(recordPermission, "recordPermission");
  //   if (recordPermission) {
  //     const result = await audioRecorderPlayer.startRecorder(path);

  //     audioRecorderPlayer.addRecordBackListener((e) => {
  //       setState((prevState) => ({
  //         ...prevState,
  //         recordSecs: e.currentPosition,
  //         recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
  //       }));
  //     });
  //     console.log(result, "RESULT");
  //     console.log(state, "state");
  //   }
  // };

  // const stopRecording = async () => {
  //   const result = await audioRecorderPlayer.stopRecorder();
  //   audioRecorderPlayer.removeRecordBackListener();
  //   setState((prevState) => ({
  //     ...prevState,
  //     recordSecs: 0,
  //   }));
  //   console.log(result);
  //   onRecordingEnd();
  // };

  // const onStartPlay = async () => {
  //   const msg = await audioRecorderPlayer.startPlayer(path);
  //   console.log(msg);
  //   audioRecorderPlayer.addPlayBackListener((e) => {
  //     setState((prevState) => ({
  //       ...prevState,
  //       currentPositionSec: e.currentPosition,
  //       currentDurationSec: e.duration,
  //       playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
  //       duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
  //     }));
  //   });
  // };

  // const onPausePlay = async () => {
  //   await audioRecorderPlayer.pausePlayer();
  // };

  // const onStopPlay = () => {
  //   audioRecorderPlayer.stopPlayer();
  //   audioRecorderPlayer.removePlayBackListener();
  //   setState((prevState) => ({
  //     ...prevState,
  //     currentPositionSec: 0,
  //     currentDurationSec: 0,
  //   }));
  // };

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a11110f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "586942222a0f-3da1-471f-bd96-145571e29d72",
      title: "Fourth Item",
    },
    {
      id: "58694a3330f-3da1-471f-bd96-145571e29d72",
      title: "Fifth Item",
    },
  ];

  return (
    <View style={styles.main}>
      {/* <BaseSafeAreaView> */}
      <SafeAreaView>
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
                <Text style={[styles.history_text, { textDecorationLine: "underline" }]}>
                  View all
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.resultBoxMain}>
              <FlatList
                data={DATA}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <View
                    style={[
                      styles.historyBox1,
                      index === 0
                        ? { marginVertical: 10, marginLeft: 0, marginRight: 10 }
                        : { margin: 10 },
                    ]}
                  >
                    <View style={styles.resultBoxTextView}>
                      <Text style={styles.resultBoxText}>{item?.title}</Text>
                    </View>
                    <View style={styles.resultBoxScore}>
                      <Text style={styles.resultBoxScoreText}>2 / 5</Text>
                    </View>
                  </View>
                )}
                keyExtractor={(item) => item.id}
              />
            </View>
          </View>
          <View style={styles.fourthContainer}>
            <TouchableOpacity
              onPress={
                isRecordingStart
                  ? () => {
                      stopRecognizing();
                      // stopRecording();
                    }
                  : () => {
                      startRecognizing();
                      // startRecording();
                    }
              }
            >
              <View style={styles.micIconBox}>
                {isRecordingStart ? (
                  <View style={styles.stopMicIcon} />
                ) : (
                  <Image style={styles.micIcon} source={micIcon} />
                )}
              </View>
            </TouchableOpacity>
            {/* <Button title="PLAY" onPress={onStartPlay} />
            <Button title="STOP" onPress={onStopPlay} /> */}
          </View>
        </View>
      </SafeAreaView>
      {/* </BaseSafeAreaView> */}
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
    flexDirection: "row",
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
  resultBoxMain: {
    height: "80%",
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 15,
  },
  historyBox1: {
    width: 200,
    height: "90%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.primary_color,
  },
  resultBoxTextView: {
    height: "80%",
  },
  resultBoxText: {
    color: theme.white_color,
  },
  resultBoxScore: {
    height: "20%",
    alignItems: "flex-end",
    borderTopColor: theme.primary_text_color,
    borderTopWidth: 0.5,
  },
  resultBoxScoreText: {
    color: theme.secondary_color,
    fontSize: 14,
    paddingRight: 10,
    marginTop: 7,
    fontWeight: "bold",
  },
});
