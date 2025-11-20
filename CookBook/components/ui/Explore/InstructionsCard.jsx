import { View, Text, StyleSheet } from "react-native";

export default function InstructionsCard({ instructions }) {
  return (
    <View style={styles.card}>
      <Text style={styles.text}>{instructions}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
    borderWidth: 1,
    borderColor: "#f1f3f4",
  },
  text: {
    fontSize: 16,
    lineHeight: 26,
    color: "#495057",
    textAlign: "justify",
  },
});
