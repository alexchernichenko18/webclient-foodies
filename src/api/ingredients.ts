import api from "./client";

export type IngredientDetails = {
  id: string;
  name: string;
  img: string;
  description: string | null;
  measure: string | null;
};

export const getIngredients = async (): Promise<IngredientDetails[]> => {
  const res = await api.get<IngredientDetails[]>("/ingredients");
  return res.data;
};