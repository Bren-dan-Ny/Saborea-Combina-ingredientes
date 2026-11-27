import {
  Grid,
  Box,
  VStack,
  Text,
  Flex,
  HStack,
  Heading,
  Image,
} from "@chakra-ui/react";
import SearchBar from "./searchBar/SearchBar"; // Ajusta tu ruta

interface HeroSectionProps {
  onSearch: (ingredients: string) => void;
  isLoading: boolean;
}

const HeroSection = ({ onSearch, isLoading }: HeroSectionProps) => {
  return (
    <Box mx={{ base: 6, md: 12, lg: 20 }} my={16}>
      <Grid
        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
        gap={{ base: 12, lg: 24 }}
        alignItems="center"
        w="100%"
      >
        <Box w="100%">
          <VStack gap={5} align="stretch" mb={5}>
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
              size={{ base: "3xl", md: "4xl", lg: "7xl" }}
              fontFamily="'Fraunces', serif"
              lineHeight={1.1}
            >
              Comer bien empieza{" "}
              <Text as="span" color="orangered">
                por aquí.
              </Text>
            </Heading>

            <Text color="gray.600" fontSize={{ base: "sm", md: "md" }}>
              Convierte los ingredientes que ya tienes en recetas memorables,
              simples y llenas de sabor.
            </Text>
          </VStack>

          <SearchBar onSearch={onSearch} isLoading={isLoading} />
        </Box>

        {/* COLUMNA DERECHA: La imagen */}
        <Box
          w="100%"
          h={{ base: "300px", md: "450px", lg: "550px" }}
          borderRadius="2xl"
          overflow="hidden"
          boxShadow="2xl"
          display={{ base: "block", md: "block" }}
        >
          <Image
            src="https://images.pexels.com/photos/4929692/pexels-photo-4929692.jpeg?auto=compress&cs=tinysrgb&w=800"
            alt="Plato saludable de Saborea"
            w="100%"
            h="100%"
            objectFit="cover"
          />
        </Box>
      </Grid>
    </Box>
  );
};

export default HeroSection;
