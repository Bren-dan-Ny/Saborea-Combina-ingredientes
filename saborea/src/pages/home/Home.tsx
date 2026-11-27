import { useState, useEffect } from "react";
import BaseLayout from "../../shared/layout/BaseLayout";
import RecipeList from "../../components/card/recipeList/RecipeList";
import {
  searchRecipesByIngredients,
  getRandomRecipes,
} from "../../services/mealService";
import { Text, Flex, Heading, VStack, Box } from "@chakra-ui/react";
import HeroSection from "../../components/hero/HeroSection";

const Home = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    const cargarRecetasIniciales = async () => {
      setLoading(true);
      const recetas = await getRandomRecipes();
      setRecipes(recetas);
      setLoading(false);
    };

    cargarRecetasIniciales();
  }, []);

  const handleSearch = async (ingrediente: string) => {
    setLoading(true);
    setHasSearched(true);

    try {
      const recetas = await searchRecipesByIngredients(ingrediente);
      setRecipes(recetas);
    } catch (error) {
      console.error("error al buscar recetas", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseLayout>
      <Flex direction="column" flex="1" w="100%">
        <HeroSection onSearch={handleSearch} isLoading={loading} />

        <Box
          backgroundColor="#fbfaf5"
          flex="1"
          px={{ base: 6, md: 12, lg: 20 }}
          pt={{ base: 8, lg: 12 }}
          pb={{ base: 10, lg: 16 }}
        >
          <VStack
            mb={4}
            align="stretch"
            id="recetas"
            borderBottom="1px solid"
            pb={4}
          >
            <Flex
              direction={{ base: "column", md: "row" }}
              justify="space-between"
              align={{ base: "start", md: "end" }}
              w="100%"
            >
              <VStack align="start" gap={4}>
                <Text
                  fontSize="x-small"
                  fontWeight="bold"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  color="orangered"
                  fontFamily="DM Sans"
                >
                  {hasSearched ? "Resultados de búsqueda" : "Selección saborea"}
                </Text>

                <Heading
                  as="h2"
                  fontFamily="'Fraunces', serif"
                  fontSize={{ base: "2xl", md: "4xl" }}
                >
                  {hasSearched
                    ? "Lo que encontramos para ti"
                    : "Una mesa llena de ideas"}
                </Heading>
              </VStack>

              <Flex align="center" gap={4} mt={{ base: 4, md: 0 }}>
                <Text
                  color="orangered"
                  fontSize={{ base: "2xl", md: "3xl" }}
                  fontWeight="bold"
                  fontFamily="'Fraunces', serif"
                  lineHeight={1}
                >
                  {recipes.length < 10 ? `0${recipes.length}` : recipes.length}
                </Text>
                <Text
                  lineHeight="1.1"
                  fontFamily="DM Sans"
                  fontSize="x-small"
                  color="gray.500"
                  textTransform="uppercase"
                  letterSpacing="widest"
                  fontWeight="bold"
                >
                  Recetas <br /> encontradas
                </Text>
              </Flex>
            </Flex>
          </VStack>

          {loading ? (
            <Flex justify="center" py={16}>
              <Text fontSize={{ base: "md", md: "lg" }} color="gray.500">
                {hasSearched
                  ? "Buscando recetas..."
                  : "Cargando recetas deliciosas..."}
              </Text>
            </Flex>
          ) : recipes.length > 0 ? (
            <RecipeList
              recipes={recipes}
              type={hasSearched ? "search" : "random"}
            />
          ) : (
            <Text
              color="gray.500"
              py={16}
              textAlign="center"
              fontSize={{ base: "sm", md: "md" }}
            >
              No se encontraron recetas. ¡Intenta con otros ingredientes!
            </Text>
          )}
        </Box>
      </Flex>
    </BaseLayout>
  );
};

export default Home;
