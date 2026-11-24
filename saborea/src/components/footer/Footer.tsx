import { Link } from "react-router-dom";
import LogoBlanco from "../../assets/saborea_blanco_transparente.png";
import { Flex, Text, Image, VStack } from "@chakra-ui/react";
import { FaArrowUp } from "react-icons/fa6";

const Footer = () => {
  return (
    <VStack as="footer" bg="#171c1a" align="stretch" gap={5} py={5}>
      <Flex align="center" justify="space-between">
        <Link to="/">
          <Image src={LogoBlanco} alt="LogoIso" style={{ height: "50px" }} />
        </Link>
        <Link to="/">
          <Flex color="#d7f05d" align="center" fontSize="small" gap={1}>
            Volver arriba
            <FaArrowUp />
          </Flex>
        </Link>
      </Flex>
      <Text color="gray.400" fontSize="sm">
        Idea sencilla. Comida extraordinaria
      </Text>
    </VStack>
  );
};

export default Footer;
