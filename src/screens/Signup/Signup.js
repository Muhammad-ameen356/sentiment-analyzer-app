import { Icon } from "components";
import { logo, theme } from "constants";
import { useState, createRef } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "store/actions";

const SignupScreen = ({ navigation }) => {
  const { isLoading } = useSelector((state) => state.auth);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errortext, setErrortext] = useState("");

  const dispatch = useDispatch();

  const passwordInputRef = createRef();

  const handleSubmitPress = () => {
    setErrortext("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    if (!userName) {
      alert("Please fill User Name");
      return;
    }

    const dataToSend = { userName, email: userEmail, password: userPassword };

    dispatch(signup({ userData: dataToSend }));
  };

  return (
    <View style={styles.mainBody}>
      {/* <Loader loading={loading} /> */}
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>
              <Image
                source={logo}
                style={{
                  width: "80%",
                  height: 200,
                  resizeMode: "contain",
                  margin: 10,
                }}
              />
              <View style={styles.logoTextContainer}>
                <Icon
                  iconFrom="MaterialIcons"
                  iconName="graphic-eq"
                  color={theme.secondary_color}
                />
                <Text style={styles.logoText}>Speak with Tahoe</Text>
              </View>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserName) => setUserName(UserName)}
                placeholder="User Name"
                placeholderTextColor={theme.placeholder_color}
                autoCapitalize="none"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) => setUserEmail(UserEmail)}
                placeholder="Enter Email" // dummy@abc.com
                placeholderTextColor={theme.placeholder_color}
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() => passwordInputRef.current && passwordInputRef.current.focus()}
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) => setUserPassword(UserPassword)}
                placeholder="Enter Password" // 12345
                placeholderTextColor={theme.placeholder_color}
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext !== "" ? <Text style={styles.errorTextStyle}>{errortext}</Text> : null}
            <TouchableOpacity
              style={[
                styles.buttonStyle,
                isLoading
                  ? { backgroundColor: theme.primary_color }
                  : { backgroundColor: theme.secondary_color },
              ]}
              activeOpacity={0.5}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>Create Account</Text>
            </TouchableOpacity>
            <Text
              style={styles.registerTextStyle}
              onPress={() => navigation.navigate("LoginScreen")}
            >
              Already have an account
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: theme.main_black,
    alignContent: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: theme.secondary_color,
    borderWidth: 0,
    color: theme.white_color,
    borderColor: theme.secondary_color,
    height: 40,
    alignItems: "center",
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: theme.white_color,
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: theme.white_color,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  logoText: {
    // backgroundColor: "red",
    fontSize: 24,
    fontWeight: "bold",
    color: theme.white_color,
    paddingHorizontal: 20,
  },
  logoTextContainer: {
    flexDirection: "row",
  },
});
