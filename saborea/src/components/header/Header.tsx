import { Link as RouterLink, NavLink, useLocation } from "react-router-dom";
import { Box, Button, Flex, HStack, Image } from "@chakra-ui/react";
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
        {/* 1. LOGO: Usamos RouterLink directo */}
        <RouterLink to="/">
          <Image
            src={LogoIso}
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
        </RouterLink>

        <HStack gap={{ base: 3, md: 6 }}>
          {/* 2. RECETAS: Usamos etiquetas <a> o <RouterLink> */}
          {isFavoritesPage ? (
            <RouterLink
              to="/"
              style={{
                textDecoration: "none",
                color: "#4A5568",
                fontWeight: 500,
                fontSize: "0.875rem",
              }}
            >
              Recetas
            </RouterLink>
          ) : (
            <a
              href="#recetas"
              style={{
                textDecoration: "none",
                color: "#4A5568",
                fontWeight: 500,
                fontSize: "0.875rem",
              }}
            >
              Recetas
            </a>
          )}

          {/* 3. FAVORITOS: Usamos NavLink directo */}
          <NavLink
            to={Paths.favorites}
            style={({ isActive }) => ({
              textDecoration: "none",
              color: isActive ? "#171c1a" : "#4A5568",
              fontWeight: isActive ? "bold" : 500,
              fontSize: "0.875rem",
              display: "flex",
              alignItems: "center",
            })}
          >
            Favoritos
            {favorites.length > 0 && (
              <span
                style={{
                  color: "#f05a32",
                  fontSize: "0.75rem",
                  fontWeight: "bold",
                  marginLeft: "4px",
                }}
              >
                {favorites.length}
              </span>
            )}
          </NavLink>
        </HStack>

        {/* 4. BOTÓN DE USUARIO / LOGIN */}
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
          // Usamos RouterLink directo dentro de un Button
          <RouterLink
            to="/login"
            style={{
              backgroundColor: "#171c1a",
              color: "white",
              paddingLeft: "16px",
              paddingRight: "16px",
              paddingTop: "8px",
              paddingBottom: "8px",
              borderRadius: "8px",
              display: "inline-flex",
              alignItems: "center",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            <span
              style={{ display: "none", marginRight: "8px" }}
              className="login-text"
            >
              Login
            </span>
            <RiArrowRightLine />
          </RouterLink>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
