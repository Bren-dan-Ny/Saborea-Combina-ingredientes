const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

// 1. FUNCIÓN PARA EL AUTOCOMPLETADo
export const autocompleteIngredients = async (query: string) => {
  if (!query || query.trim().length < 2) return [];

  const url = `https://api.spoonacular.com/food/ingredients/autocomplete?query=${encodeURIComponent(query)}&number=5&language=en&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error en autocompletado");

    const data = await res.json();

    if (!Array.isArray(data)) return [];
    return data.map((ing: { name: string }) => ing.name);
  } catch (error) {
    console.error("Error en autocompletado:", error);
    return [];
  }
};

// 2. FUNCIÓN PARA BUSCAR RECETAS
export const searchRecipesByIngredients = async (ingredients: string) => {
  if (!ingredients || ingredients.trim().length === 0) return [];

  const url = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${encodeURIComponent(ingredients)}&number=10&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error buscando recetas");

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error("La API devolvió un formato inesperado", data);
      return [];
    }

    return data;
  } catch (error) {
    console.error("Error buscando recetas:", error);
    return [];
  }
};

export const getRandomRecipes = async () => {
  const url = `https://api.spoonacular.com/recipes/random?number=6&apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Error al cargar recetas aleatorias");

    const data = await res.json();
    return data.recipes;
  } catch (error) {
    console.error("Error al obtener recetas aleatorias", error);
    return [];
  }
};

export const getRecipeInformation = async (id: string | number) => {
  const url = `https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY}`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw Error("No se pudo cargar la receta");
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error obteniendo informacion de la receta", error);
    return null;
  }
};
