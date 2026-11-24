export const calculateDifficulty = (minutos?: number) => {
  if (!minutos) return null;

  if (minutos <= 20) {
    return { texto: "Fácil", color: "orangered" };
  } else if (minutos >= 45) {
    return { texto: "Media", color: "orangered" };
  } else {
    return { texto: "Elaborada", color: "orangered" };
  }
};
