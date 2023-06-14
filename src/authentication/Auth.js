import { Dashboard, History } from "screens";
import { BeforeAuthStack } from "stacks";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Text, TouchableOpacity, View, StyleSheet, Image } from "react-native";
import { profileImage, theme } from "constants";
import { Icon } from "components";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "store/reducers";
import { TextAnalyzer } from "screens/TextAnalyzer";

const Drawer = createDrawerNavigator();

const drawerIcon = ({ focused, size }, { iconName, iconFrom }) => (
  <Icon
    iconFrom={iconFrom}
    iconName={iconName}
    size={size}
    color={focused ? theme.secondary_color : theme.white_color}
  />
);

const customDrawerContent = (props) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(userLogout());
  };

  return (
    <View style={styles.drawerContainer}>
      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.profileImageContainer}>
          <Image source={profileImage} style={styles.profileImage} />
        </View>
        <Text style={styles.username}>John Doe</Text>
      </View>

      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const DrawerComponent = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={customDrawerContent}
    screenOptions={{
      drawerActiveTintColor: theme.primary_text_color,
      drawerItemStyle: {},
      drawerLabelStyle: {
        color: theme.white_color,
        fontSize: 16,
      },
    }}
  >
    <Drawer.Screen
      name="Home"
      component={Dashboard}
      options={{
        animation: "slide_from_right",
        headerShown: false,
        drawerIcon: (e) =>
          drawerIcon(e, { iconName: "google-analytics", iconFrom: "MaterialCommunityIcons" }),
      }}
    />
    <Drawer.Screen
      name="TextAnalyzer"
      component={TextAnalyzer}
      options={{
        title: "Text Analyzer",
        animation: "slide_from_right",
        headerShown: false,
        drawerIcon: (e) => drawerIcon(e, { iconName: "text", iconFrom: "MaterialCommunityIcons" }),
      }}
    />
    <Drawer.Screen
      name="History"
      component={History}
      options={{
        animation: "slide_from_right",
        headerShown: false,
        drawerIcon: (e) =>
          drawerIcon(e, { iconName: "history", iconFrom: "MaterialCommunityIcons" }),
      }}
    />
  </Drawer.Navigator>
);

const Auth = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return isLoggedIn ? <DrawerComponent /> : <BeforeAuthStack />;
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: theme.main_black,
  },
  profileSection: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: theme.white_color,
    alignItems: "center",
    marginTop: 30,
  },
  profileImageContainer: {
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 18,
    color: theme.white_color,
    fontWeight: "bold",
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  logoutButtonText: {
    color: theme.secondary_color,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Auth;
