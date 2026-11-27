import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { AuthProvider } from "./shared/context/UserContext";
import { FavoritesProvider } from "./shared/context/FavoritesContext";
import { HashRouter } from "react-router-dom";
import AppRoutes from "./router/AppRoutes";
import { Toaster } from "sonner";
import "../index.css";

function App() {
  return (
    <>
      <HashRouter>
        <ChakraProvider value={defaultSystem}>
          <AuthProvider>
            <FavoritesProvider>
              <Toaster position="bottom-right" richColors />
              <AppRoutes />
            </FavoritesProvider>
          </AuthProvider>
        </ChakraProvider>
      </HashRouter>
    </>
  );
}

export default App;
