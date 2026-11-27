import { Box, Heading, Text, SimpleGrid, VStack, Flex } from "@chakra-ui/react";
import { useFavorites } from "../../shared/context/FavoritesContext";
import { RecipeCard } from "../../components/card/recipeCard/RecipeCard";
import BaseLayout from "../../shared/layout/BaseLayout";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <BaseLayout>
      <VStack
        align="start"
        gap={6}
        pb={4}
        pt={4}
        mx={{ base: 4, md: 8, lg: 16 }}
        my={4}
      >
        <VStack align="stretch" gap={4}>
          <Text
            fontSize="x-small"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="widest"
            color="orangered"
          >
            Tu recetario
          </Text>
          <Heading as="h2" fontFamily="'Fraunces', serif" fontSize="3xl">
            Tus recetas guardadas
          </Heading>
        </VStack>

        {favorites.length === 0 ? (
          <Flex w="100%" justify="center" py={20}>
            <Text color="gray.500" fontSize="lg">
              Aún no tienes recetas guardadas. ¡Explora y dale al corazón!
            </Text>
          </Flex>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8} w="100%">
            {favorites.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </SimpleGrid>
        )}
      </VStack>
    </BaseLayout>
  );
};

export default Favorites;
