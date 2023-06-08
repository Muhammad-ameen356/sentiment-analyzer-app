import { analyzeData } from "__fixtures__";
import { HistoryCard, Icon } from "components";
import { theme } from "constants";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const History = ({ navigation }) => {
  console.log("first");
  return (
    <View style={styles.main}>
      <View style={styles.firstContainer}>
        <TouchableOpacity
          style={styles.drawerIconContainer}
          onPress={() => navigation.openDrawer()}
        >
          <Icon iconFrom="Ionicons" iconName="menu" color="#fff" />
        </TouchableOpacity>

        <View style={styles.textContainer}>
          <Text style={styles.firstContainerText}>History</Text>
        </View>
      </View>
      <View style={styles.resultBoxMain}>
        <FlatList
          data={analyzeData}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ marginHorizontal: 18 }}
          renderItem={({ item, index }) => <HistoryCard item={item} index={index} />}
        />
      </View>
    </View>
  );
};

export default History;

const styles = StyleSheet.create({
  main: {
    backgroundColor: theme.main_black,
    flex: 1,
  },
  firstContainer: {
    height: "5%",
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 25,
    marginVertical: 10,
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
  resultBoxMain: {
    width: "100%",
    marginBottom: "16%",
    alignItems: "center",
  },
});
