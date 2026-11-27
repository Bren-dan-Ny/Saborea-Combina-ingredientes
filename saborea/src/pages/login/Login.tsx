import {
  Box,
  Input,
  VStack,
  Field,
  Button,
  Link,
  Image,
  Flex,
} from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../shared/context/UserContext";
import { useState, type SyntheticEvent } from "react";
import Logo from "../../assets/saborea-logo.svg";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleLogin = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const username = data.username as string;
    const password = data.password as string;

    const result = await login(username, password);

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Error al iniciar sesión");
    }
  };

  return (
    <Box position="relative" w="100vw" h="100vh" overflow="hidden">
      <Image
        src="https://images.pexels.com/photos/12664793/pexels-photo-12664793.jpeg"
        alt="ImageLogin"
        w="100%"
        h="100%"
        objectFit="cover"
        position="absolute"
        top={0}
        left={0}
        zIndex={0}
      />
      <Box
        position="absolute"
        top={0}
        left={0}
        w="100%"
        h="100%"
        bg="blackAlpha.500"
        zIndex={1}
      >
        <Flex
          position="absolute"
          top={0}
          left={0}
          w="100%"
          h="100%"
          align="center"
          justify="center"
          zIndex={2}
        >
          <Box bg="white" p={8} borderRadius="xl" boxShadow="2xl" w="400px">
            <Box mb={6} textAlign="center">
              <Image src={Logo} alt="Logo Saborea" h="50px" mx="auto" />
            </Box>

            <form onSubmit={handleLogin}>
              <VStack gap={4} align="stretch">
                <Field.Root>
                  <Field.Label>Usuario</Field.Label>
                  {/* El atributo name es obligatorio para que FormData lo lea */}
                  <Input name="username" type="text" />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Contraseña</Field.Label>
                  <Input name="password" type="password" />
                </Field.Root>

                {/* Mostramos el error si es que existe */}
                {error && (
                  <Box color="red.500" fontSize="sm">
                    {error}
                  </Box>
                )}

                <Link
                  as={RouterLink}
                  color="ink"
                  alignSelf="flex-end"
                  fontSize="sm"
                >
                  Olvidaste tu contraseña
                </Link>

                <Button w="100%" colorPalette="orange" type="submit" mt={2}>
                  Ingresar
                </Button>
              </VStack>
            </form>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Login;
