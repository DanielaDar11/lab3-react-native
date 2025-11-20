const url_baza = "https://www.themealdb.com/api/json/v1/1";

export async function fetchRecipes(query) {
  const response = await fetch(`${url_baza}/search.php?s=${query}`);
  const json = await response.json();
  return json.meals ?? [];
}

export async function fetchRecipeDetails(id) {
  const response = await fetch(`${url_baza}/lookup.php?i=${id}`);
  const json = await response.json();
  return json.meals?.[0] ?? null;
}
