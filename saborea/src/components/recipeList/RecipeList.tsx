import { SimpleGrid, Text, Box } from "@chakra-ui/react";
// 1. Importamos correctamente las dos tarjetas (asegúrate de que las rutas sean correctas)
import { RecipeCard } from "../recipeCard/RecipeCard";
import { RandomRecipeCard } from "../recipeCard/RandomRecipeCard";

interface RecipeListProps {
  recipes: any[];
  type: "random" | "search"; // 2. Agregamos la prop 'type'
}

const RecipeList = ({ recipes, type }: RecipeListProps) => {
  // Si no hay recetas, mostramos un mensaje
  if (recipes.length === 0) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="gray.500" fontSize="lg">
          No se encontraron recetas. ¡Intenta buscando otros ingredientes!
        </Text>
      </Box>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} w="100%" my={10}>
      {recipes.map((recipe) => {
        if (type === "random") {
          return <RandomRecipeCard key={recipe.id} recipe={recipe} />;
        }

        return <RecipeCard key={recipe.id} recipe={recipe} />;
      })}
    </SimpleGrid>
  );
};

export default RecipeList;
