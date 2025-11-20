import { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { fetchRecipes } from "../../../services/api";
import RecipeCard from "../../../components/ui/Explore/RecipeCard";
import SearchInput from "../../../components/ui/Explore/SearchInput";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LoadingIndicator from "../../../components/ui/Explore/LoadingIndicator";

export default function Explore() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  function loadRecipes(value) {
    setLoading(true);

    fetchRecipes(value).then((data) => {
      setRecipes(data);
      setLoading(false);
    });
  }

  useEffect(() => {
    loadRecipes("");
  }, []);

  function handleSearch() {
    if (search.trim() !== "") {
      loadRecipes(search);
    } else {
      loadRecipes("");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Discover Recipes</Text>

      <SearchInput
        value={search}
        onChange={setSearch}
        onSubmit={handleSearch}
      />

      {loading ? (
        <LoadingIndicator />
      ) : recipes.length === 0 ? (
        <>
          <Text style={styles.noResults}>No recipes found !</Text>
          <MaterialCommunityIcons
            name="food-off"
            size={24}
            color="#888"
            style={styles.icon}
          />
        </>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <RecipeCard
              id={item.idMeal}
              name={item.strMeal}
              thumb={item.strMealThumb}
              category={item.strCategory}
              cuisine={item.strArea}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, backgroundColor: "#ffedebff" },
  title: { fontSize: 22, fontWeight: "700", margin: 10, color: "#4f0000ff" },
  loading: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    color: "#727171ff",
  },
  noResults: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 20,
    color: "#220101ff",
    fontWeight: "700",
  },
  icon: {
    textAlign: "center",
    fontSize: 35,
    marginTop: 20,
    color: "#220101ff",
    fontWeight: "700",
  },
});
