import { Link as RouterLink, NavLink } from "react-router-dom";
import { Box, Button, Flex, HStack, Link, Image } from "@chakra-ui/react";
import { Paths } from "../../router/path";
import LogoIso from "../../assets/saborea-isologo.png";
import { useAuth } from "../../shared/context/UserContext";
import { LuUser } from "react-icons/lu";

const Header = () => {
  const { user } = useAuth();

  return (
    <Box as="header" borderBottom="1px solid" borderColor="line" pb={4} pt={4}>
      <Flex align="center" justify="space-between">
        {/* Logo */}
        <Link as={RouterLink} to="/">
          <Image src={LogoIso} alt="LogoIso" style={{ height: "40px" }} />
        </Link>

        <HStack gap={6}>
          <Link href="#recetas" textDecoration="none">
            <Box
              color="gray.600"
              fontWeight="500"
              paddingBottom="4px"
              borderBottom="2px solid transparent"
              transition="all 0.2s ease"
              _hover={{
                color: "ink",
                borderColor: "orangered",
                textDecoration: "none",
              }}
            >
              Recetas
            </Box>
          </Link>

          <Link
            as={NavLink}
            to={Paths.favorites}
            textDecoration="none"
            color="gray.600"
            fontWeight="500"
            paddingBottom="4px"
            borderBottom="2px solid transparent"
            transition="all 0.2s ease"
            _hover={{
              color: "ink",
              borderColor: "orangered",
            }}
            _activeLink={{
              borderColor: "orangered",
              color: "#171c1a",
            }}
          >
            Favoritos
          </Link>
        </HStack>

        {user ? (
          <Button
            bg="#171c1a"
            color="white"
            borderRadius="full"
            w="40px"
            h="40px"
          >
            {user.username.substring(0, 2).toUpperCase()}
          </Button>
        ) : (
          <Button
            as={RouterLink}
            to="/login"
            bg="#171c1a"
            color="white"
            borderRadius="full"
            w="40px"
            h="40px"
            p={0}
            _hover={{ bg: "orangered" }}
          >
            <LuUser size={20} />
          </Button>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
