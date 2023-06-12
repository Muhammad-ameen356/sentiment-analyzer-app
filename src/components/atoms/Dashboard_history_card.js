import { emoji } from "__fixtures__";
import { theme } from "constants";
import { StyleSheet, Text, View } from "react-native";

const DashboardHistoryCard = ({ item, index }) => (
  <View
    style={[
      styles.historyBox1,
      index === 0 ? { marginVertical: 10, marginLeft: 0, marginRight: 10 } : { margin: 10 },
    ]}
  >
    <View style={styles.resultBoxTextView}>
      <Text style={styles.resultBoxTextLabel}>{item?.sentimentDetails?.sentenceSentiment}:</Text>
      <Text style={styles.resultBoxText}>{item?.remarks}</Text>
    </View>
    <View style={styles.resultBoxScore}>
      <Text style={styles.resultBoxScoreText}>{emoji(item)}</Text>
      <Text style={styles.resultBoxScoreText}>{item?.score} / 5</Text>
    </View>
  </View>
);

export default DashboardHistoryCard;

const styles = StyleSheet.create({
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
});
