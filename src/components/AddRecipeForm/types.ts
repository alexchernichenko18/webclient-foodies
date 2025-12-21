export interface SelectOption {
  value: string;
  label: string;
}

export interface IngredientUI {
  id: string;
  name: string;
  quantity: string;
  img?: string;
}

export interface AddRecipeFormValues {
  name: string;
  description: string;
  categoryId: string;
  areaId: string;
  time: number;
  instructions: string;
  ingredients: string[];
  img: File | null;
}

export type IngredientOption = {
  id: string;
  name: string;
  img?: string;
};