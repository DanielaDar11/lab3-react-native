import { Stack } from "expo-router";

export default function ExploreLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Recipes", headerShown: true }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: "Recipe Details", headerShown: true }}
      />
    </Stack>
  );
}
