/* eslint-disable no-unused-vars */
import { BaseSafeAreaView, DashboardHistoryCard, Icon } from "components";
import { theme, micIcon, unitedFlag } from "constants";
import {
  Button,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Voice from "@react-native-voice/voice";
import { useEffect, useId, useState } from "react";
import { microphonePermission, multiplePermissionForRecordAudio } from "utils";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import RNFetchBlob from "rn-fetch-blob";
import { analyzeData, emoji } from "__fixtures__";
import { useDispatch, useSelector } from "react-redux";
import { analyzeText, getSuggestion, textCorrection } from "store/actions";

const TextAnalyzer = ({ navigation }) => {
  const [isRecordingStart, setIsRecordingStart] = useState(false);
  const {
    analyzer: { textAnalyzeResult, isLoading },
  } = useSelector((state) => state);

  const [text, setText] = useState("");
  const [hintResponses, setHintResponses] = useState({});

  const uniqueId = useId();
  const dispatch = useDispatch();

  const onRecordingStart = () => {
    setIsRecordingStart(true);
  };

  const onRecordingEnd = () => {
    setIsRecordingStart(false);
  };

  useEffect(() => {
    Voice.onSpeechStart = onSpeechTextStartHandler;
    Voice.onSpeechEnd = onSpeechTextEndHandler;
    Voice.onSpeechResults = onSpeechTextResultsHandler;
    Voice.onSpeechVolumeChanged = onSpeechTextVolumeChangedHandler;
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const onSpeechTextStartHandler = (e) => {
    console.log(e, "start");
  };

  const onSpeechTextEndHandler = (e) => {
    onRecordingEnd();
  };

  const onSpeechTextResultsHandler = (e) => {
    const speechData = {
      text: e.value[0],
    };
    setText(speechData.text);
    dispatch(textCorrection({ speechData }))
      .unwrap()
      .then((result) => {
        dispatch(analyzeText({ result }));
      })
      .catch((err) => {
        console.log(err, "err");
      });
  };

  const onSpeechTextVolumeChangedHandler = (e) => {
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

  const analyzeTextFunction = () => {
    dispatch(analyzeText({ result: { text } }));
  };

  const getSuggestionFunction = () => {
    dispatch(getSuggestion({ text }))
      .unwrap()
      .then((result) => {
        setHintResponses(result);
      })
      .catch((error) => {
        console.warn(error, "err");
      });
  };

  const updateAllText = async () => {
    setText(hintResponses?.suggestedText);
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

  return (
    <View style={styles.main}>
      <SafeAreaView>
        <View style={styles.firstContainer}>
          <TouchableOpacity
            style={styles.drawerIconContainer}
            onPress={() => navigation.openDrawer()}
          >
            <Icon iconFrom="Ionicons" iconName="menu" color="#fff" />
          </TouchableOpacity>

          <View style={styles.textContainer}>
            <Text style={styles.firstContainerText}>
              {isRecordingStart ? "Listening..." : "Analyze your Text"}
            </Text>
          </View>
        </View>
        <View style={styles.secondContainer}>
          {/* <View style={styles.box1}> */}
          {/* <View style={styles.flag_language}>
              <Image style={styles.flag_language_image} source={unitedFlag} />
              <Text style={styles.flag_language_text}>English</Text>
            </View> */}
          {/* <View style={styles.second_inner_box}>
              <Text style={styles.box1Text}>We Say What we think, right</Text>
            </View> */}
          {/* </View> */}
          <TextInput
            style={styles.box1}
            placeholder="Enter Text to Analyze"
            placeholderTextColor={theme.white_color}
            onChangeText={setText}
            value={text}
          />
        </View>
        <View style={styles.buttonsView}>
          <TouchableOpacity style={styles.button} onPress={analyzeTextFunction}>
            <Text style={styles.btnText}> Analyze</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={getSuggestionFunction}>
            <Text style={styles.btnText}> Get hint</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={updateAllText}>
            <Text style={styles.btnText}> Update All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.thirdContainer}>
          <View style={styles.historyBTN}>
            <Text style={styles.history_text}>History</Text>
            {/* <TouchableOpacity onPress={() => navigation.navigate("History")}>
              <Text style={[styles.history_text, { textDecorationLine: "underline" }]}>
                View all
              </Text>
            </TouchableOpacity> */}
          </View>
          <View style={styles.resultBoxMain}>
            <FlatList
              data={textAnalyzeResult}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                // <DashboardHistoryCard key={item?.id} item={item} index={index} />
                <View
                  style={[
                    styles.historyBox1,
                    index === 0
                      ? { marginVertical: 10, marginLeft: 0, marginRight: 10 }
                      : { margin: 10 },
                  ]}
                >
                  <View style={styles.resultBoxTextView}>
                    <View>
                      <Text style={styles.resultBoxTextLabel}>{item?.sentenceSentiment}:</Text>
                      <Text style={styles.resultBoxText}>{item?.correctText}</Text>
                    </View>
                  </View>
                  <View style={styles.resultBoxScore}>
                    <Text style={styles.resultBoxScoreText}>{emoji(item)}</Text>
                    <Text style={styles.resultBoxScoreText}>{item?.score} / 5</Text>
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
                  }
                : () => {
                    startRecognizing();
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
      </SafeAreaView>
    </View>
  );
};

export default TextAnalyzer;

const styles = StyleSheet.create({
  main: {
    backgroundColor: theme.main_black,
    flex: 1,
  },
  firstContainer: {
    height: 60,
    flexDirection: "row",
    paddingTop: 10,
    marginHorizontal: 25,
  },
  textContainer: {
    marginTop: 4,
    flex: 1,
    alignItems: "center",
  },
  firstContainerText: {
    fontSize: 18,
    color: theme.secondary_color,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  secondContainer: {
    height: "35%",
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

  box1: {
    height: "85%",
    margin: 30,
    backgroundColor: theme.primary_color,
    borderRadius: 15,
    padding: 20,
    color: theme.white_color,
    fontSize: 20,
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
    height: "13%",
  },
  history_text: {
    color: theme.white_color,
    fontSize: 16,
  },
  resultBoxMain: {
    height: "80%",
    marginLeft: 30,
    marginRight: 30,
  },

  //   History Box

  historyBox1: {
    width: 200,
    height: "90%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: theme.primary_color,
  },
  resultBoxText: {
    color: theme.white_color,
    marginTop: 8,
  },
  resultBoxTextView: {
    height: "80%",
    justifyContent: "space-between",
  },
  resultBoxTextLabel: {
    color: theme.white_color,
    fontWeight: "bold",
  },
  resultBoxScore: {
    height: "20%",
    alignItems: "flex-end",
    borderTopColor: theme.primary_text_color,
    borderTopWidth: 0.5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  resultBoxScoreText: {
    color: theme.secondary_color,
    fontSize: 14,
    fontWeight: "bold",
  },

  buttonStyle: {
    backgroundColor: theme.placeholder_color,
    paddingVertical: 10,
    borderRadius: 10,
    paddingHorizontal: 5,
    marginVertical: 5,
  },

  //   input: {
  //     height: 40,
  //     margin: 12,
  //     borderWidth: 1,
  //     padding: 10,
  //   },
  buttonsView: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 6,
  },
  button: {
    // padding: 20,
    backgroundColor: theme.secondary_color,
  },
  btnText: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontWeight: "bold",
  },
});
