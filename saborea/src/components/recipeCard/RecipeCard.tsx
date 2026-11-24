import { Box, Image, Heading, Text, HStack, Badge } from "@chakra-ui/react";

interface RecipeProps {
  recipe: {
    id: number;
    title: string;
    image: string;
    usedIngredientCount?: number; // Los hacemos opcionales
    missedIngredientCount?: number;
    usedIngredients?: { name: string }[];
    missedIngredients?: { name: string }[];
  };
}

export const RecipeCard = ({ recipe }: RecipeProps) => {
  return (
    <Box
      bg="#fbfaf5"
      borderColor="line"
      overflow="hidden"
      transition="transform 0.2s ease, boxShadow 0.2s ease"
      _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
      cursor="pointer"
    >
      <Image
        src={recipe.image}
        alt={recipe.title}
        w="100%"
        h="200px"
        objectFit="cover"
      />
      <Box p={5}>
        <Heading as="h3" size="md" mb={2} fontFamily="heading" lineClamp={2}>
          {recipe.title}
        </Heading>

        {recipe.usedIngredientCount !== undefined && (
          <HStack gap={2} mb={4} flexWrap="wrap">
            <Badge colorPalette="green" variant="subtle">
              Usas {recipe.usedIngredientCount}
            </Badge>
            <Badge colorPalette="orange" variant="subtle">
              Faltan {recipe.missedIngredientCount}
            </Badge>
          </HStack>
        )}

        {recipe.usedIngredients && recipe.usedIngredients.length > 0 && (
          <>
            <Text fontSize="sm" color="gray.600" mb={1}>
              <strong>Ingredientes que tienes:</strong>
            </Text>
            <Text fontSize="sm" color="gray.500" lineClamp={2}>
              {recipe.usedIngredients.map((ing) => ing.name).join(", ")}
            </Text>
          </>
        )}

        {recipe.missedIngredients && recipe.missedIngredients.length > 0 && (
          <Text fontSize="xs" color="gray.400" mt={2} lineClamp={1}>
            Te falta:{" "}
            {recipe.missedIngredients.map((ing) => ing.name).join(", ")}
          </Text>
        )}
      </Box>
    </Box>
  );
};
