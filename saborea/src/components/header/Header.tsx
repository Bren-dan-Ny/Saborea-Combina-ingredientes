import { Link as RouterLink, NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Button,
  Flex,
  HStack,
  Link,
  Image,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Paths } from "../../router/path";
import LogoIso from "../../assets/saborea-isologo.png";
import LogoCompleto from "../../assets/saborea-logo.svg";
import { useAuth } from "../../shared/context/UserContext";
import { RiArrowRightLine } from "react-icons/ri";
import { useFavorites } from "../../shared/context/FavoritesContext";

const Header = () => {
  const { user } = useAuth();
  const { favorites } = useFavorites();
  const location = useLocation();

  const isFavoritesPage = location.pathname === "/favorites";

  const logoSrc = useBreakpointValue({
    base: LogoIso,
    md: LogoCompleto,
  });

  return (
    <Box
      as="header"
      borderBottom="1px solid"
      borderColor="line"
      pb={4}
      pt={4}
      mx={{ base: 6, md: 12, lg: 20 }}
    >
      <Flex align="center" justify="space-between">
        <Link as={RouterLink} to="/">
          <Image
            src={logoSrc}
            alt="Saborea"
            h="40px"
            objectFit="contain"
            display={{ base: "block", md: "none" }}
          />

          <Image
            src={LogoCompleto}
            alt="Saborea - Comer bien empieza por aquí"
            h="50px"
            objectFit="contain"
            display={{ base: "none", md: "block" }}
          />
        </Link>

        <HStack gap={{ base: 3, md: 6 }}>
          {isFavoritesPage ? (
            <Link
              as={RouterLink}
              to="/"
              textDecoration="none"
              color="gray.600"
              fontWeight="500"
              fontSize={{ base: "xs", md: "sm" }}
              transition="all 0.2s ease"
              _hover={{ color: "ink" }}
            >
              Recetas
            </Link>
          ) : (
            <Link
              href="#recetas"
              textDecoration="none"
              color="gray.600"
              fontWeight="500"
              fontSize={{ base: "xs", md: "sm" }}
              transition="all 0.2s ease"
              _hover={{
                color: "ink",
                textDecoration: "none",
              }}
            >
              Recetas
            </Link>
          )}

          <Link
            as={NavLink}
            to={Paths.favorites}
            textDecoration="none"
            color="gray.600"
            fontWeight="500"
            fontSize={{ base: "xs", md: "sm" }}
            transition="all 0.2s ease"
            display="flex"
            alignItems="center"
            _hover={{ color: "ink" }}
            _activeLink={{ color: "ink", fontWeight: "bold" }}
          >
            Favoritos
            {favorites.length > 0 && (
              <Box
                as="span"
                color="orangered"
                fontSize="xs"
                fontWeight="bold"
                ml={1}
                borderRadius="full"
              >
                {favorites.length}
              </Box>
            )}
          </Link>
        </HStack>

        {user ? (
          <Button
            bg="#171c1a"
            color="white"
            borderRadius="full"
            w={{ base: "32px", md: "40px" }}
            h={{ base: "32px", md: "40px" }}
            fontSize={{ base: "xs", md: "sm" }}
          >
            {user.username.charAt(0).toUpperCase()}
          </Button>
        ) : (
          <Button
            as={RouterLink as any}
            to="/login"
            bg="#171c1a"
            variant="outline"
            color="white"
            fontSize={{ base: "xs", md: "sm" }}
            px={{ base: 2, md: 4 }}
            py={{ base: 1, md: 2 }}
            _hover={{ bg: "orangered" }}
          >
            <Box as="span" display={{ base: "none", md: "inline" }} mr={2}>
              Login
            </Box>
            <RiArrowRightLine />
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
