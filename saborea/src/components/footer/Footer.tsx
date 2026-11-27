import { Link as RouterLink } from "react-router-dom";
import LogoBlanco from "../../assets/saborea_blanco_transparente.png";
import { Flex, Text, Image, Link, Box } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa6";

const Footer = () => {
  return (
    <Box as="footer" bg="#171c1a" py={6} px={{ base: 4, md: 8, lg: 16 }}>
      <Flex
        direction={{ base: "row", md: "row" }}
        align={{ base: "start", md: "center" }}
        justify="space-between"
        w="100%"
        gap={4}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          align={{ base: "start", md: "center" }}
          justify={{ base: "start", md: "space-between" }}
          flex="1"
          gap={{ base: 3, md: 8 }}
        >
          <RouterLink to="/">
            <Image
              src={LogoBlanco}
              alt="Saborea Logo"
              h={{ base: "35px", md: "50px" }}
              objectFit="contain"
            />
          </RouterLink>

          <Text
            color="gray.400"
            fontSize="sm"
            textAlign={{ base: "left", md: "center" }}
            flex={{ base: "none", md: "1" }}
          >
            Idea sencilla. Comida extraordinaria
          </Text>
        </Flex>

        <Link
          href="#inicio"
          _hover={{ textDecoration: "none", opacity: 0.8 }}
          mt={{ base: 1, md: 0 }}
        >
          <Flex
            color="#d7f05d"
            align="center"
            fontSize="sm"
            fontWeight="bold"
            gap={1}
          >
            <Box as="span" display={{ base: "none", md: "inline" }}>
              Volver
            </Box>
            arriba
            <FaArrowUp />
          </Flex>
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;
