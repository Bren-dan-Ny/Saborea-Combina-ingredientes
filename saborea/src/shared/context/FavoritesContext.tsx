import {
  createContext,
  useState,
  useEffect,
  useContext,
  type ReactNode,
} from "react";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  [key: string]: any;
}

interface FavoritesContextType {
  favorites: Recipe[];
  addFavorite: (recipe: Recipe) => void;
  removeFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("saborea_favorites");
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Error leyendo favoritos", error);
      }
    }
  }, []);

  const saveToLocalStorage = (newFavorites: Recipe[]) => {
    setFavorites(newFavorites);
    localStorage.setItem("saborea_favorites", JSON.stringify(newFavorites));
  };

  const addFavorite = (recipe: Recipe) => {
    if (favorites.some((fav) => fav.id === recipe.id)) return;
    const newFavorites = [...favorites, recipe];
    saveToLocalStorage(newFavorites);
  };

  const removeFavorite = (id: number) => {
    const newFavorites = favorites.filter((fav) => fav.id !== id);
    saveToLocalStorage(newFavorites);
  };

  const isFavorite = (id: number) => {
    return favorites.some((fav) => fav.id === id);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites usado dentro de un FavoritesProvider");
  }
  return context;
};
