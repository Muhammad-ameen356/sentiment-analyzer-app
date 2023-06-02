import { useState } from "react";
import { Text } from "react-native";
import { BeforeAuthStack } from "stacks";

const Auth = () => {
  console.log("auth");
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return isLoggedIn ? <Text>Auth</Text> : <BeforeAuthStack />;
};

export default Auth;
