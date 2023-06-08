import { StyleSheet, Text, View } from "react-native";
import { emoji } from "__fixtures__";
import { theme } from "constants";

const HistoryCard = ({ item, index }) => (
  <View style={[styles.historyBox1, index === 0 && { marginTop: 20 }]}>
    <View style={styles.resultBoxTextView}>
      <Text style={styles.resultBoxText}>Your Words: {item?.transcription}</Text>
      <Text style={styles.resultBoxTextLabel}>{item?.label}:</Text>
      <Text style={styles.resultBoxText}>{item?.description}</Text>
    </View>
    <View style={styles.resultBoxScore}>
      <Text style={styles.resultBoxScoreText}>{emoji(item)}</Text>
      <Text style={styles.resultBoxScoreText}>{item?.score} / 5</Text>
    </View>
  </View>
);

export default HistoryCard;

const styles = StyleSheet.create({
  // Box style
  historyBox1: {
    marginTop: 10,
    height: 200,
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
    marginTop: 10,
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
    fontSize: 18,
    fontWeight: "bold",
  },
});
