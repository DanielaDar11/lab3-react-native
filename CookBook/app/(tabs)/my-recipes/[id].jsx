import { useEffect, useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import {
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import { getRecipeById, deleteRecipe } from "../../../services/db";
import CategoryBadge from "./../../../components/ui/Explore/CategoryBadge";
import IngredientCard from "./../../../components/ui/Explore/IngredientCard";
import InstructionsCard from "./../../../components/ui/Explore/InstructionsCard";
import { Ionicons } from "@expo/vector-icons";

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const recipeData = getRecipeById(id);
    if (recipeData) {
      setRecipe({
        ...recipeData,
        ingredients: recipeData.ingredients
          ? JSON.parse(recipeData.ingredients)
          : [],
      });
    }
  }, [id]);

  const handleDelete = () => {
    Alert.alert(
      "Delete Recipe",
      "Are you sure you want to delete this recipe?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            deleteRecipe(id);
            router.push("/my-recipes");
          },
        },
      ]
    );
  };

  if (!recipe)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loading}>Loading recipe...</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {recipe.image && (
        <Image source={{ uri: recipe.image }} style={styles.image} />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.name}</Text>
        <CategoryBadge category={recipe.category} cuisine={recipe.cuisine} />

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View>
          {recipe.ingredients.map((ing, i) => (
            <IngredientCard
              key={i}
              ingredient={ing.name}
              measure={ing.measure}
            />
          ))}
        </View>

        <Text style={styles.sectionTitle}>Instructions</Text>
        <InstructionsCard instructions={recipe.instructions} />

        <View style={styles.buttonsRow}>
          <Pressable
            style={[styles.actionButton, styles.editButton]}
            onPress={() => router.push(`/my-recipes/edit_recipe?id=${id}`)}
          >
            <Ionicons
              name="create-outline"
              size={20}
              color="#fff"
              style={styles.icon}
            />
            <Text style={[styles.buttonText, styles.editText]}>Edit</Text>
          </Pressable>

          <Pressable
            style={[styles.actionButton, styles.deleteButton]}
            onPress={handleDelete}
          >
            <Ionicons
              name="trash-outline"
              size={20}
              color="#e63946"
              style={styles.icon}
            />
            <Text style={[styles.buttonText, styles.deleteText]}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f8f9fa" },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f9fa",
  },
  loading: { fontSize: 18, color: "#6c757d", fontStyle: "italic" },
  image: { width: "100%", height: 300 },
  content: {
    padding: 20,
    marginTop: -15,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#2d3436",
    textAlign: "center",
  },
  buttonsRow: { flexDirection: "row", justifyContent: "space-between" },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  icon: { marginRight: 8 },
  editButton: { backgroundColor: "#a80000ff" },
  deleteButton: {
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#e63946",
  },
  buttonText: { fontWeight: "600", fontSize: 17 },
  editText: { color: "#fff" },
  deleteText: { color: "#e63946" },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "500",
    marginVertical: 10,
    color: "#2d3436",
  },
});
