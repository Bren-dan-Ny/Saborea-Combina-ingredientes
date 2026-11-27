import {
  useState,
  useEffect,
  type SubmitEvent,
  type KeyboardEvent,
} from "react";
import { Flex, Text, Button, Input, Box, Tag } from "@chakra-ui/react";
import { CiSearch } from "react-icons/ci";
import { autocompleteIngredients } from "../../services/mealService";

const MAX_INGREDIENTES = 2;

interface SearchHeroProps {
  onSearch: (ingredientes: string) => void;
  isLoading?: boolean;
}

const SearchBar = ({ onSearch, isLoading }: SearchHeroProps) => {
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
      <Box position="relative" w="100%">
        <Flex
          direction={{ base: "column", md: "row" }}
          w="100%"
          boxShadow="4px 4px 0px"
          bg="#fbfaf5"
          border="1px solid"
          borderColor="line"
        >
          <Flex
            flex="1"
            align="center"
            gap={2}
            px={{ base: 2, md: 4 }}
            py={2}
            minH="50px"
            flexWrap="wrap"
            borderRight={{ base: "none", md: "1px solid" }}
            borderColor={{ base: "none", md: "line" }}
          >
            <Flex color="gray.500" flexShrink={0}>
              <CiSearch size="24px" />
            </Flex>

            {/* ETIQUETAS SELECCIONADAS */}
            {selectedIngredients.map((ing) => (
              <Tag.Root
                key={ing}
                size={{ base: "sm", md: "md" }} // Un poco más pequeñas
                variant="solid"
                colorPalette="orangered"
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
                fontSize={{ base: "sm", md: "md" }}
                _focus={{ outline: "none", boxShadow: "none" }}
              />
            )}
          </Flex>

          <Button
            type="submit"
            bg="orangered"
            color="white"
            borderRadius="0"
            w={{ base: "100%", md: "auto" }}
            h={{ base: "44px", md: "auto" }}
            px={8}
            fontSize={{ base: "sm", md: "md" }}
            loading={isLoading}
            _hover={{ opacity: 0.9 }}
          >
            Buscar
          </Button>
        </Flex>

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
              maxH="200px"
              overflowY="auto"
            >
              <Flex direction="column">
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
              </Flex>
            </Box>
          )}
      </Box>
    </form>
  );
};

export default SearchBar;
