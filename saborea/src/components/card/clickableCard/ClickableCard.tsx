import { Link as RouterLink } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface ClickableCardProps {
  id: number;
  children: ReactNode;
}

export const ClickableCard = ({ id, children }: ClickableCardProps) => {
  return (
    <RouterLink to={`/recipe/${id}`}>
      <Box
        transition="transform 0.2s ease"
        _hover={{ transform: "translateY(-2px)" }}
      >
        {children}
      </Box>
    </RouterLink>
  );
};
