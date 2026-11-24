import { useState, useEffect } from "react";
import SearchHero from "../../components/heroSection/searchHero/SearchHero";
import BaseLayout from "../../shared/layout/BaseLayout";
import RecipeList from "../../components/recipeList/RecipeList";
import {
  searchRecipesByIngredients,
  getRandomRecipes,
} from "../../services/mealService";
import { Text, Flex, HStack, Heading, VStack } from "@chakra-ui/react";

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
  }, []); // El array vacío hace que solo se ejecute al cargar la página

  // 3. La función de búsqueda también va por fuera
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
      <VStack gap={5} my={10} align="stretch">
        <HStack>
          <Flex
            w="30px"
            h="30px"
            border="1px solid"
            borderColor="ink"
            borderRadius="full"
            align="center"
            justify="center"
          >
            <Text fontSize="x-small" fontWeight="bold">
              01
            </Text>
          </Flex>
          <Text
            fontSize="x-small"
            fontWeight="bold"
            textTransform="uppercase"
            letterSpacing="widest"
            color="orangered"
          >
            Tu cocina, nuevas ideas
          </Text>
        </HStack>

        <Heading
          as="h1"
          size="4xl"
          fontFamily="'Fraunces', serif"
          lineHeight={1}
        >
          Comer bien empieza{" "}
          <Text as="span" color="orangered">
            por aquí.
          </Text>
        </Heading>

        <Text color="gray.600" fontSize="sm">
          Convierte los ingredientes que ya tienes en recetas memorables,
          simples y llenas de sabor.
        </Text>
      </VStack>

      <SearchHero onSearch={handleSearch} isLoading={loading} />

      {/* 4. Título dinámico (opcional pero le da un toque profesional) */}
      <VStack
        as="h2"
        mt={10}
        mb={4}
        fontFamily="'Fraunces', serif"
        align="stretch"
      >
        {!hasSearched ? (
          <>
            <Text
              fontSize="x-small"
              fontWeight="bold"
              textTransform="uppercase"
              letterSpacing="widest"
              color="orangered"
              fontFamily="DM Sans"
            >
              Selección saborea
            </Text>
            <Heading fontFamily="'Fraunces', serif" fontSize="2xl">
              Una mesa llena de ideas
            </Heading>
            <Flex align="center" gap={2}>
              <Text color="orangered" fontSize="2xl">
                06
              </Text>
              <Text
                lineHeight="1"
                fontFamily="DM Sans"
                fontSize="x-small"
                color="gray.500"
                textTransform="uppercase"
                letterSpacing="widest"
                fontWeight="bold"
              >
                Recetas <br></br> encontradas
              </Text>
            </Flex>
          </>
        ) : (
          <Text>asdasd</Text>
        )}
      </VStack>

      {/* 5. Renderizado de la lista o estado de carga */}
      {loading ? (
        <Flex justify="center" py={10}>
          <Text fontSize="lg" color="gray.500">
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
        <Text color="gray.500" py={10}>
          No se encontraron recetas. ¡Intenta con otros ingredientes!
        </Text>
      )}
    </BaseLayout>
  );
};

export default Home;
