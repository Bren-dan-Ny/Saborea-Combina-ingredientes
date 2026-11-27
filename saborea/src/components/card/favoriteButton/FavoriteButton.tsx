import { IconButton } from "@chakra-ui/react";
import { LuHeart } from "react-icons/lu";
import { useFavorites } from "../../../shared/context/FavoritesContext";
import { useAuth } from "../../../shared/context/UserContext";
import { toast } from "sonner"; // <-- Aquí va la notificación

export const FavoriteButton = ({ recipe }: { recipe: any }) => {
  const { user } = useAuth();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const esFavorito = isFavorite(recipe.id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      toast.error("Debes iniciar sesión para guardar favoritos");
      return;
    }

    if (esFavorito) {
      removeFavorite(recipe.id);
      toast("Receta eliminada de favoritos");
    } else {
      addFavorite(recipe);
      toast.success("¡Receta guardada en favoritos!");
    }
  };

  return (
    <IconButton
      aria-label="Guardar en favoritos"
      position="absolute"
      top={3}
      right={3}
      onClick={handleToggleFavorite}
      bg="white"
      color={esFavorito ? "red.500" : "gray.400"}
      _hover={{ bg: "gray.100", transform: "scale(1.1)" }}
      borderRadius="full"
      boxShadow="md"
      size="sm"
    >
      <LuHeart fill={esFavorito ? "currentColor" : "none"} size={18} />
    </IconButton>
  );
};
