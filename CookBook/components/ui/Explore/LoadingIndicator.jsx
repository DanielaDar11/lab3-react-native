import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingIndicator() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4f0000ff" />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    alignItems: "center",
  },
  text: {
    marginTop: 10,
    fontSize: 18,
    color: "#727171ff",
    fontWeight: "500",
  },
});
