import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./shared/context/UserContext";
import { FavoritesProvider } from "./shared/context/FavoritesContext";
import { system } from "./theme/index";
import AppRoutes from "./router/AppRoutes";
import { Toaster } from "sonner";
import "../index.css";

function App() {
  return (
    <>
      <BrowserRouter basename="/Saborea-Combina-ingredientes/saborea/">
        <ChakraProvider value={system}>
          <AuthProvider>
            <FavoritesProvider>
              <Toaster position="bottom-right" richColors />
              <AppRoutes />
            </FavoritesProvider>
          </AuthProvider>
        </ChakraProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
