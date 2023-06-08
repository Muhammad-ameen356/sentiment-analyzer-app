import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

const BaseSafeAreaView = ({ children }) => (
  <SafeAreaView style={styles.flex}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.flex}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>{children}</TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </SafeAreaView>
);

export default BaseSafeAreaView;
