import {
  createContext,
  useEffect,
  useState,
  useContext,
  type ReactNode,
} from "react";

interface User {
  username: string;
}

interface AuthContextType {
  user: User | null;
  // Corregido: succes -> success
  login: (
    username: string,
    password: string,
  ) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const sesionGuardada = localStorage.getItem("SesionSaborea");
    if (sesionGuardada) {
      setUser(JSON.parse(sesionGuardada));
    }
  }, []);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/user?username=${username}`,
      );
      const data = await response.json();

      if (data.length === 0) {
        return { success: false, message: "Usuario no encontrado" };
      }

      const usuarioEncontrado = data[0];

      if (usuarioEncontrado.password === password) {
        const sesion = { username: usuarioEncontrado.username };

        // Corregido: Unificado el nombre de la clave
        localStorage.setItem("SesionSaborea", JSON.stringify(sesion));
        setUser(sesion);

        return { success: true };
      } else {
        // Corregido: mesagge -> message
        return { success: false, message: "Contraseña incorrecta" };
      }
    } catch (error) {
      console.error("Error al conectar con el servidor:", error);
      return { success: false, message: "Error de conexión" };
    }
  };

  const logout = () => {
    localStorage.removeItem("SesionSaborea");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
