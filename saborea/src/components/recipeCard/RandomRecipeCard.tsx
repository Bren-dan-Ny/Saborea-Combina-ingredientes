import { Box, Image, Heading, Text, Flex } from "@chakra-ui/react";
import { calculateDifficulty } from "../../shared/utils/calculateDifficulty";
import { FaRegClock } from "react-icons/fa6";

interface RandomRecipeProps {
  recipe: {
    id: number;
    title: string;
    image: string;
    readyInMinutes?: number;
  };
}

export const RandomRecipeCard = ({ recipe }: RandomRecipeProps) => {
  const dificultad = calculateDifficulty(recipe.readyInMinutes);

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
      <Box p={7}>
        <Flex gap={3} alignItems="center" mb={2}>
          <Flex gap={2} align="center">
            <FaRegClock color="orangered" />
            {/* Tiempo y dificultad */}
            <Text
              textTransform="uppercase"
              letterSpacing="widest"
              fontSize="xs"
              color="orangered"
              fontWeight="bold"
            >
              {recipe.readyInMinutes} min
            </Text>
          </Flex>
          <Text>-</Text>

          {dificultad && (
            <Text
              textTransform="uppercase"
              letterSpacing="widest"
              fontSize="xs"
              colorPalette={dificultad.color}
              fontWeight="bold"
              color="orangered"
            >
              {dificultad.texto}
            </Text>
          )}
        </Flex>

        <Heading as="h3" size="md" mb={2} fontFamily="heading" lineClamp={2}>
          {recipe.title}
        </Heading>

        {/* Texto estático que le da vida a la tarjeta */}
        <Text fontSize="xs" color="gray.500" lineClamp={2}>
          Una deliciosa receta para preparar en casa. Haz clic para ver los
          ingredientes y pasos completos.
        </Text>
      </Box>
    </Box>
  );
};
