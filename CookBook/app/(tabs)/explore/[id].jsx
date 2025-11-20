import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { fetchRecipeDetails } from "../../../services/api";
import CategoryBadge from "./../../../components/ui/Explore/CategoryBadge";
import IngredientCard from "./../../../components/ui/Explore/IngredientCard";
import InstructionsCard from "../../../components/ui/Explore/InstructionsCard";

export default function RecipeDetails() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    if (id) {
      fetchRecipeDetails(id).then((data) => setRecipe(data));
    }
  }, [id]);
  if (!recipe)
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6b6b" />
        <Text style={styles.loading}>Loading recipe...</Text>
      </View>
    );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Image source={{ uri: recipe.strMealThumb }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>{recipe.strMeal}</Text>

        <CategoryBadge category={recipe.strCategory} cuisine={recipe.strArea} />

        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View>
          {(() => {
            let cards = [];
            for (let i = 1; recipe["strIngredient" + i]; i++) {
              cards.push(
                <IngredientCard
                  key={i}
                  ingredient={recipe["strIngredient" + i]}
                  measure={recipe["strMeasure" + i]}
                />
              );
            }
            return cards;
          })()}
        </View>

        <Text style={styles.sectionTitle}>Instructions</Text>
        <InstructionsCard instructions={recipe.strInstructions} />
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
    color: "#2d3436",
    borderLeftWidth: 4,
    borderLeftColor: "#ff6b6b",
    paddingLeft: 12,
  },
});
