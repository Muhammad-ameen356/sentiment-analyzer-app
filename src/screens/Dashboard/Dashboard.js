import { BaseSafeAreaView } from "components";
import { theme } from "constants";
import { StyleSheet, Text, View } from "react-native";

const Dashboard = () => {
  console.log("dashboard");
  return (
    <View style={styles.main}>
      <BaseSafeAreaView>
        <Text>Dashboard</Text>
      </BaseSafeAreaView>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  main: {
    backgroundColor: theme.primary_color,
    flex: 1,
  },
});
