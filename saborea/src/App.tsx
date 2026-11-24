import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./shared/context/UserContext";
import { system } from "./theme/index";
import AppRoutes from "./router/AppRoutes";
import "../index.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <ChakraProvider value={system}>
          <AuthProvider>
            <AppRoutes />
          </AuthProvider>
        </ChakraProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
