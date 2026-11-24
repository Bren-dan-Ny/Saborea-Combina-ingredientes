import {
  useState,
  useEffect,
  type SubmitEvent,
  type KeyboardEvent,
} from "react";
import { Flex, Text, Button, Input, VStack, Box, Tag } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { autocompleteIngredients } from "../../../services/mealService";

const MAX_INGREDIENTES = 2;

interface SearchHeroProps {
  onSearch: (ingredientes: string) => void;
  isLoading?: boolean;
}

const SearchHero = ({ onSearch, isLoading }: SearchHeroProps) => {
  const [query, setQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [sugerencias, setSugerencias] = useState<string[]>([]);
  const [showSugerencias, setShowSugerencias] = useState(false);

  useEffect(() => {
    if (query.trim().length < 2) {
      setSugerencias([]);
      return;
    }

    const timer = setTimeout(async () => {
      const results = await autocompleteIngredients(query);
      setSugerencias(results);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const addIngrediente = (ingrediente: string) => {
    if (selectedIngredients.length >= MAX_INGREDIENTES) return;
    if (!selectedIngredients.includes(ingrediente)) {
      setSelectedIngredients([...selectedIngredients, ingrediente]);
    }
    setQuery("");
    setSugerencias([]);
    setShowSugerencias(false);
  };

  const removeIngrediente = (ingrediente: string) => {
    setSelectedIngredients(
      selectedIngredients.filter((ing) => ing !== ingrediente),
    );
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedIngredients.length > 0) {
      onSearch(selectedIngredients.join(","));
    } else if (query.trim() !== "") {
      // Si el usuario escribió pero no seleccionó de la lista, busca lo que escribió
      onSearch(query);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && sugerencias.length > 0) {
      e.preventDefault();
      addIngrediente(sugerencias[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: "100%" }}>
      <VStack
        gap={0}
        position="relative"
        w="100%"
        boxShadow="5px 5px 0px"
        bg="#fbfaf5"
        border="1px solid"
        borderColor="line"
      >
        <Flex w="100%" align="center" gap={2} px={4} py={2} minH="56px">
          <Flex color="gray.500" flexShrink={0}>
            <CiSearch size="24px" />
          </Flex>

          {/* ETIQUETAS SELECCIONADAS */}
          {selectedIngredients.map((ing) => (
            <Tag.Root
              key={ing}
              size="lg"
              variant="solid"
              colorPalette="orangeBrand"
              flexShrink={0}
            >
              <Tag.Label>{ing}</Tag.Label>
              <Tag.EndElement>
                <Tag.CloseTrigger onClick={() => removeIngrediente(ing)} />
              </Tag.EndElement>
            </Tag.Root>
          ))}

          {/* INPUT */}
          {selectedIngredients.length < MAX_INGREDIENTES && (
            <Input
              type="text"
              placeholder={
                selectedIngredients.length === 0
                  ? "Ej. Tomate, Aguacate..."
                  : "Añade otro..."
              }
              border="none"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSugerencias(true);
              }}
              onFocus={() => setShowSugerencias(true)}
              onBlur={() => setTimeout(() => setShowSugerencias(false), 200)}
              onKeyDown={handleKeyDown}
              flex="1"
              minW="100px"
              px={0}
              _focus={{ outline: "none", boxShadow: "none" }}
            />
          )}
        </Flex>

        <Button
          type="submit"
          bg="orangered"
          color="white"
          borderRadius="0"
          w="100%"
          h="50px"
          isLoading={isLoading}
          _hover={{ opacity: 0.9 }}
        >
          Buscar
        </Button>

        {/* LISTA FLOTANTE DE SUGERENCIAS */}
        {showSugerencias &&
          sugerencias.length > 0 &&
          selectedIngredients.length < MAX_INGREDIENTES && (
            <Box
              position="absolute"
              top="100%"
              left={0}
              w="100%"
              bg="white"
              border="1px solid"
              borderColor="line"
              borderRadius="md"
              boxShadow="lg"
              zIndex={10}
              mt={1}
            >
              <VStack align="stretch" gap={0}>
                {sugerencias.map((sugerencia) => (
                  <Box
                    key={sugerencia}
                    px={4}
                    py={2}
                    cursor="pointer"
                    _hover={{ bg: "gray.100" }}
                    onClick={() => addIngrediente(sugerencia)}
                  >
                    <Text fontSize="sm">{sugerencia}</Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          )}
      </VStack>
    </form>
  );
};

export default SearchHero;
