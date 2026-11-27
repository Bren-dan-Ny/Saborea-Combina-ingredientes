import { useState, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { getRecipeInformation } from "../../services/mealService";
import {
  Box,
  Heading,
  Image,
  Text,
  VStack,
  Spinner,
  Flex,
  List,
  Badge,
} from "@chakra-ui/react";
import { FaArrowLeft, FaRegClock } from "react-icons/fa6";
import BaseLayout from "../../shared/layout/BaseLayout";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipe = async () => {
      if (id) {
        setLoading(true);
        const data = await getRecipeInformation(id);
        setRecipe(data);
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Spinner size="xl" color="orangeBrand" />
      </Flex>
    );
  }

  if (!recipe) {
    return (
      <Flex justify="center" align="center" h="100vh">
        <Text>Receta no encontrada.</Text>
      </Flex>
    );
  }

  const instructions = recipe.analyzedInstructions?.[0]?.steps || [];

  return (
    <BaseLayout>
      <Box
        w="100%"
        flex={1}
        bgImage="url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=1600')"
        bgSize="cover"
        backgroundPosition="center"
        bgAttachment="fixed"
        py={10}
        px={4}
        position="relative"
        _before={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          w: "100%",
          h: "100%",
          bg: "blackAlpha.400",
          backdropFilter: "blur(8px)",
          zIndex: 0,
        }}
      >
        <Box
          maxW="900px"
          mx="auto"
          bg="white"
          borderRadius="2xl"
          boxShadow="2xl"
          p={{ base: 6, md: 10 }}
          position="relative"
        >
          <RouterLink
            to="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              marginBottom: "24px",
              color: "#4A5568",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            <FaArrowLeft style={{ marginRight: "8px" }} /> Volver al inicio
          </RouterLink>

          <Image
            src={recipe.image}
            alt={recipe.title}
            w="100%"
            h={{ base: "250px", md: "350px" }}
            objectFit="cover"
            borderRadius="xl"
            mb={6}
          />

          <Heading
            as="h1"
            size="2xl"
            mb={4}
            fontFamily="heading"
            color="gray.800"
          >
            {recipe.title}
          </Heading>

          <Flex gap={4} mb={8} flexWrap="wrap">
            <Badge
              colorPalette="orangeBrand"
              variant="subtle"
              p={2}
              borderRadius="md"
            >
              <Flex align="center" gap={1}>
                <FaRegClock /> {recipe.readyInMinutes} min
              </Flex>
            </Badge>
            <Badge
              colorPalette="green"
              variant="subtle"
              p={2}
              borderRadius="md"
            >
              🍽️ {recipe.servings} porciones
            </Badge>
          </Flex>

          <Heading
            as="h2"
            size="lg"
            mb={4}
            fontFamily="heading"
            color="gray.800"
          >
            Ingredientes
          </Heading>
          <List.Root mb={8} color="gray.600">
            {recipe.extendedIngredients?.map((ing: any) => (
              <List.Item key={ing.id} mb={2}>
                {ing.original}
              </List.Item>
            ))}
          </List.Root>

          <Heading
            as="h2"
            size="lg"
            mb={4}
            fontFamily="heading"
            color="gray.800"
          >
            Instrucciones
          </Heading>
          <VStack align="stretch" gap={4}>
            {instructions.length > 0 ? (
              instructions.map((step: any) => (
                <Box
                  key={step.number}
                  p={4}
                  bg="gray.50"
                  borderRadius="md"
                  borderLeft="4px solid"
                  borderColor="orangeBrand"
                >
                  <Text fontWeight="bold" color="orangeBrand" mb={1}>
                    Paso {step.number}
                  </Text>
                  <Text color="gray.700">{step.step}</Text>
                </Box>
              ))
            ) : (
              <Text color="gray.500">
                No hay instrucciones detalladas disponibles.
              </Text>
            )}
          </VStack>
        </Box>
      </Box>
    </BaseLayout>
  );
};

export default RecipeDetail;
