import { Stack } from "expo-router";

export default function MyRecipeLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "My Recipes", headerShown: true }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: "Add Recipe", headerShown: true }}
      />
      <Stack.Screen
        name="edit_recipe"
        options={{ title: "Edit Recipe", headerShown: true }}
      />
    </Stack>
  );
}
