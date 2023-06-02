import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LoginScreen, SignupScreen } from "screens";

const Stack = createNativeStackNavigator();

const BeforeAuthStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="LoginScreen"
      options={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      component={LoginScreen}
    />
    <Stack.Screen
      name="SignupScreen"
      options={{
        headerShown: false,
        animation: "slide_from_right",
      }}
      component={SignupScreen}
    />
  </Stack.Navigator>
);

export default BeforeAuthStack;
