import { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  View,
  Image,
  Alert,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { getRecipeById, updateRecipe } from "../../../services/db";
import { z } from "zod";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

// Schema Zod
const recipeSchema = z.object({
  name: z
    .string()
    .min(3, "Recipe name is required and must be at least 3 characters"),
  category: z.string().min(3, "Category is required"),
  cuisine: z.string().min(3, "Cuisine is required"),
  instructions: z
    .string()
    .min(10, "Instructions are required and must be at least 10 characters"),
  ingredients: z
    .array(z.object({ name: z.string(), measure: z.string() }))
    .min(1, "At least one ingredient is required")
    .refine((arr) => arr.every((i) => i.name.trim() && i.measure.trim()), {
      message: "All ingredients must have a name and a measure",
    }),
  image: z.string().min(1, "Recipe image is required"),
});

export default function EditRecipe() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [instructions, setInstructions] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", measure: "" }]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const recipeData = getRecipeById(id);
    if (recipeData) {
      setName(recipeData.name || "");
      setCategory(recipeData.category || "");
      setCuisine(recipeData.cuisine || "");
      setInstructions(recipeData.instructions || "");
      setImage(recipeData.image || "");
      setIngredients(
        recipeData.ingredients
          ? JSON.parse(recipeData.ingredients)
          : [{ name: "", measure: "" }]
      );
    }
  }, [id]);

  async function pickImage() {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  }

  const handleAddIngredient = () =>
    setIngredients([...ingredients, { name: "", measure: "" }]);
  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };
  const handleRemoveIngredient = (index) =>
    setIngredients(ingredients.filter((_, i) => i !== index));

  const handleSave = () => {
    try {
      const validData = recipeSchema.parse({
        name,
        category,
        cuisine,
        instructions,
        ingredients,
        image,
      });

      updateRecipe({
        id,
        name: validData.name,
        image: validData.image,
        category: validData.category,
        cuisine: validData.cuisine,
        ingredients: JSON.stringify(validData.ingredients),
        instructions: validData.instructions,
      });

      Alert.alert("Success", "Recipe updated successfully!", [
        { text: "OK", onPress: () => router.push("/my-recipes") },
      ]);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = {};
        err.errors.forEach((e) => {
          fieldErrors[e.path[0]] = e.message;
        });
        setErrors(fieldErrors);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableOnAndroid
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.label}>Recipe Image</Text>
      <Pressable style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.imagePreview} />
        ) : (
          <View style={styles.imagePickerContent}>
            <MaterialCommunityIcons
              name="image-plus"
              size={50}
              color="#850000ff"
            />
            <Text style={styles.imagePickerText}>Select Image</Text>
          </View>
        )}
      </Pressable>
      {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}

      <Text style={styles.label}>Recipe Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter recipe name"
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}

      <Text style={styles.label}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Dinner, Dessert"
        value={category}
        onChangeText={setCategory}
      />
      {errors.category && (
        <Text style={styles.errorText}>{errors.category}</Text>
      )}

      <Text style={styles.label}>Cuisine</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Italian"
        value={cuisine}
        onChangeText={setCuisine}
      />
      {errors.cuisine && <Text style={styles.errorText}>{errors.cuisine}</Text>}

      <View style={styles.addingredient}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <Pressable style={styles.addButton} onPress={handleAddIngredient}>
          <Text style={styles.addButtonText}>+ Add </Text>
        </Pressable>
      </View>

      {ingredients.map((ing, index) => (
        <View key={index} style={styles.ingredientRow}>
          <TextInput
            style={[styles.input, { flex: 2 }]}
            placeholder="Ingredient"
            value={ing.name}
            onChangeText={(val) => handleIngredientChange(index, "name", val)}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Measure"
            value={ing.measure}
            onChangeText={(val) =>
              handleIngredientChange(index, "measure", val)
            }
          />
          {ingredients.length > 1 && (
            <Pressable onPress={() => handleRemoveIngredient(index)}>
              <MaterialCommunityIcons
                name="close-circle"
                size={28}
                color="#e63946"
                style={{ marginLeft: 5 }}
              />
            </Pressable>
          )}
        </View>
      ))}
      {errors.ingredients && (
        <Text style={styles.errorText}>{errors.ingredients}</Text>
      )}

      <Text style={styles.label}>Instructions</Text>
      <TextInput
        style={[styles.input, styles.instructionsInput]}
        placeholder="Enter how to prepare the recipe"
        value={instructions}
        onChangeText={setInstructions}
        multiline
      />
      {errors.instructions && (
        <Text style={styles.errorText}>{errors.instructions}</Text>
      )}

      <Pressable style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </Pressable>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  label: { fontSize: 16, fontWeight: "600", marginTop: 15 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    marginTop: 5,
  },
  sectionTitle: { fontSize: 18, fontWeight: "700" },
  addingredient: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 25,
    marginBottom: 10,
  },
  addButton: { backgroundColor: "#e63946", padding: 10, borderRadius: 8 },
  addButtonText: { color: "#fff", fontWeight: "700" },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  instructionsInput: { minHeight: 100, textAlignVertical: "top" },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  saveButtonText: { color: "#fff", fontSize: 18 },
  imagePicker: {
    backgroundColor: "#dcdcdcff",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 5,
  },
  imagePickerContent: { justifyContent: "center", alignItems: "center" },
  imagePickerText: { color: "#666", fontSize: 16 },
  imagePreview: { width: "100%", height: "100%", borderRadius: 10 },
  errorText: { color: "red", fontSize: 13, marginTop: 2, marginBottom: 5 },
});
