import { View, Text, StyleSheet } from "react-native";

export default function CategoryBadge({ category, cuisine }) {
  return (
    <View style={styles.row}>
      {category && (
        <View style={[styles.badge, styles.category]}>
          <Text style={styles.categoryText}>{category}</Text>
        </View>
      )}
      {cuisine && (
        <View style={[styles.badge, styles.cuisine]}>
          <Text style={styles.cuisineText}>{cuisine}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  category: {
    backgroundColor: "#a1d0ffd3",
  },
  cuisine: {
    backgroundColor: "#ffe3e3",
  },
  categoryText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#002d50ff",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  cuisineText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#e63946",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});
