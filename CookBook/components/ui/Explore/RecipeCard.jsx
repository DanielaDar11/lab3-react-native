import {
  Pressable,
  Text,
  ImageBackground,
  StyleSheet,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";

export default function RecipeCard({ id, name, thumb, category, cuisine }) {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/explore/${id}`)}
      style={styles.card}
    >
      <ImageBackground source={{ uri: thumb }} style={styles.image}>
        <View style={styles.overlay}>
          <Text style={styles.name}>{name}</Text>
          <View style={styles.metaContainer}>
            {category && (
              <View style={styles.metaItem}>
                <MaterialCommunityIcons
                  name="food-outline"
                  size={14}
                  color="#fff"
                />
                <Text style={styles.metaText}>{category}</Text>
              </View>
            )}
            {cuisine && (
              <View style={styles.metaItem}>
                <Ionicons name="location-outline" size={18} color="#fff" />
                <Text style={styles.metaText}>{cuisine}</Text>
              </View>
            )}
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 250,
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "#0000008a",
    padding: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    marginBottom: 6,
  },
  metaContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
    backgroundColor: "rgba(130, 0, 0, 1)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 14,
  },
  metaText: {
    color: "#fff",
    fontSize: 12,
    marginLeft: 4,
  },
});
