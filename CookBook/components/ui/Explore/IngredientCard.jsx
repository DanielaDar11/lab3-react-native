import { View, Text, StyleSheet } from "react-native";

export default function IngredientCard({ ingredient, measure }) {
  return (
    <View style={styles.card}>
      <View style={styles.dot} />
      <Text style={styles.text}>
        {ingredient} - <Text style={styles.measure}>{measure}</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#f1f3f4",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ff6b6b",
    marginRight: 12,
  },
  text: {
    fontSize: 16,
    color: "#2d3436",
    flex: 1,
  },
  measure: {
    fontWeight: "600",
    color: "#ff6b6b",
  },
});
