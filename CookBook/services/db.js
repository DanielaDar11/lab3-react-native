import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabaseSync("recipes.db");

export const initDatabase = () => {
  db.execSync(`
    CREATE TABLE IF NOT EXISTS recipe (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      image TEXT,
      category TEXT,
      cuisine TEXT,
       ingredients TEXT,  
      instructions TEXT   
    );
  `);
};

export const insertRecipe = ({
  name,
  image,
  category,
  cuisine,
  ingredients,
  instructions,
}) => {
  const result = db.runSync(
    "INSERT INTO recipe (name, image, category, cuisine, ingredients, instructions) VALUES (?, ?, ?, ?, ?, ?);",
    [name, image, category, cuisine, JSON.stringify(ingredients), instructions]
  );
  return result.lastInsertRowId;
};

export const getAllRecipes = () => {
  const result = db.getAllSync("SELECT * FROM recipe ORDER BY id DESC;");
  return result;
};

export const getRecipeById = (id) => {
  const result = db.getFirstSync("SELECT * FROM recipe WHERE id = ?;", [id]);
  return result;
};

export const updateRecipe = ({
  id,
  name,
  image,
  category,
  cuisine,
  ingredients,
  instructions,
}) => {
  db.runSync(
    "UPDATE recipe SET name = ?, image = ?, category = ?, cuisine = ?, ingredients= ?, instructions=? WHERE id = ?;",
    [name, image, category, cuisine, ingredients, instructions, id]
  );
};

export const deleteRecipe = (id) => {
  db.runSync("DELETE FROM recipe WHERE id = ?;", [id]);
};

// Export the database instance for advanced usage
export default db;
