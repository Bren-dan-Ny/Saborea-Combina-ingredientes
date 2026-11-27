import {
  Box,
  Image,
  Heading,
  Text,
  HStack,
  Badge,
  Flex,
} from "@chakra-ui/react";
import { FaRegClock } from "react-icons/fa6";
import { calculateDifficulty } from "../../../shared/utils/calculateDifficulty";
import { FavoriteButton } from "../../card/favoriteButton/FavoriteButton";
import { ClickableCard } from "../clickableCard/ClickableCard";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  usedIngredientCount?: number;
  missedIngredientCount?: number;
  usedIngredients?: { name: string }[];
  missedIngredients?: { name: string }[];
}

interface RecipeCardProps {
  recipe: Recipe;
}

export const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const dificultad = calculateDifficulty(recipe.readyInMinutes);

  return (
    <ClickableCard id={recipe.id}>
      <Box
        bg="#fbfaf5"
        border="1px solid"
        borderColor="line"
        borderRadius="xs"
        overflow="hidden"
        h="100%"
        display="flex"
        flexDirection="column"
        transition="transform 0.2s ease, boxShadow 0.2s ease"
        _hover={{ transform: "translateY(-4px)", boxShadow: "lg" }}
        cursor="pointer"
      >
        <Box position="relative" h="200px">
          <Image
            src={recipe.image}
            alt={recipe.title}
            w="100%"
            h="100%"
            objectFit="cover"
          />
          <FavoriteButton recipe={recipe} />
        </Box>

        <Box p={5} flex="1" display="flex" flexDirection="column">
          {/* Tiempo y dificultad (si existen) */}
          {recipe.readyInMinutes && (
            <Flex>
              <HStack gap={3} mb={2} align="center">
                <HStack gap={1}>
                  <FaRegClock size={12} color="orangered" />

                  <Text
                    fontSize="xs"
                    color="orangered"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    {recipe.readyInMinutes} min
                  </Text>
                </HStack>
                <Box>-</Box>
                {dificultad && (
                  <Text
                    fontSize="xs"
                    color="orangered"
                    fontWeight="bold"
                    textTransform="uppercase"
                  >
                    {dificultad.texto}
                  </Text>
                )}
              </HStack>
            </Flex>
          )}

          <Heading as="h3" size="md" mb={2} fontFamily="heading" lineClamp={2}>
            {recipe.title}
          </Heading>

          {recipe.usedIngredientCount !== undefined && (
            <Box mt="auto">
              <HStack gap={2} mb={3} flexWrap="wrap">
                <Badge colorPalette="green" variant="subtle">
                  Usas {recipe.usedIngredientCount}
                </Badge>
                <Badge colorPalette="orangered" variant="subtle">
                  Faltan {recipe.missedIngredientCount}
                </Badge>
              </HStack>
            </Box>
          )}
        </Box>
      </Box>
    </ClickableCard>
  );
};
