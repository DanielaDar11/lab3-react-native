// app/(tabs)/my-recipes/index.jsx
import React, { useState, useEffect } from "react";
import { View, FlatList, Pressable, StyleSheet, Text } from "react-native";
import { useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getAllRecipes, initDatabase } from "../../../services/db";
import { useFocusEffect } from "@react-navigation/native";
import MyRecipeCard from "../../../components/ui/My-recipe/MyRecipeCard";

export default function MyRecipes() {
  const router = useRouter();
  const [recipes, setRecipes] = useState([]);
  const [eroare, setEroare] = useState(null);

  useEffect(() => {
    initDatabase();
  }, []);

  useFocusEffect(() => {
    try {
      const all = getAllRecipes();
      setRecipes(all);
    } catch (error) {
      setEroare("Error loading recipes.");
    }
  });
  if (eroare) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{eroare}</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/my-recipes/add")}
        >
          <MaterialCommunityIcons name="plus" size={25} color="#fff" />
        </Pressable>
      </View>
    );
  }

  if (!recipes || recipes.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No recipes yet. Add your first one!
        </Text>
        <View style={styles.iconsRow}>
          <MaterialCommunityIcons
            name="book-open-variant"
            size={120}
            color="#850000ff"
          />
          <MaterialCommunityIcons
            name="silverware"
            size={50}
            color="#ffffff"
            style={styles.icon}
          />
        </View>

        <Pressable
          style={styles.addButton}
          onPress={() => router.push("/my-recipes/add")}
        >
          <MaterialCommunityIcons name="plus" size={25} color="#fff" />
        </Pressable>
      </View>
    );
  }

  // Listă de rețete
  return (
    <View style={styles.container}>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable onPress={() => router.push(`/my-recipes/${item.id}`)}>
            <MyRecipeCard
              id={item.id}
              name={item.name}
              thumb={item.image}
              category={item.category}
              cuisine={item.cuisine}
            />
          </Pressable>
        )}
      />

      <Pressable
        style={styles.addButton}
        onPress={() => router.push("/my-recipes/add")}
      >
        <MaterialCommunityIcons name="plus" size={25} color="#fff" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    position: "relative",
    backgroundColor: "#ffedebff",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#e63946",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 20,
    color: "#666",
    textAlign: "center",
  },
  iconsRow: {
    flexDirection: "row",
    gap: 20,
  },
  icon: {
    marginLeft: -130,
    marginTop: 40,
  },
});
