import { SimpleGrid, Text, Box } from "@chakra-ui/react";
import { RecipeCard } from "../../card/recipeCard/RecipeCard";
import { RandomRecipeCard } from "../../card/recipeCard/RandomRecipeCard";

interface RecipeListProps {
  recipes: any[];
  type: "random" | "search";
}

const RecipeList = ({ recipes, type }: RecipeListProps) => {
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
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} w="100%">
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
