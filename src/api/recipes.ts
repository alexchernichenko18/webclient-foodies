import api from "./client";


export type ApiAuthor = {
  id: string;
  name: string;
  avatarUrl: string | null;
};

export type PopularRecipe = {
  id: string;
  title: string;
  description: string;
  time: number;
  imageUrl: string;
  author: ApiAuthor | null;
  favoritesCount: number;
  isFavorite: boolean;
};

export type RecipeIngredientDTO = {
  id: string;
  name: string;
  imageUrl: string;
  measure: string | null;
};

export type RecipeDetails = {
  id: string;
  title: string;
  description: string;
  instructions: string;
  time: number;
  imageUrl: string;
  category: { id: string; name: string } | null;
  area: { id: string; name: string } | null;
  author: ApiAuthor | null;
  ingredients: RecipeIngredientDTO[];
  isFavorite: boolean;
};


export async function getPopularRecipes(limit = 4): Promise<PopularRecipe[]> {
  const { data } = await api.get<{ items: PopularRecipe[] }>("/recipes/popular", {
    params: { limit },
  });
  return data.items;
}

export async function getRecipeById(recipeId: string): Promise<RecipeDetails> {
  const { data } = await api.get<RecipeDetails>(`/recipes/${recipeId}`);
  return data;
}

export async function addRecipeToFavorites(recipeId: string): Promise<boolean> {
  const { data } = await api.post<{ isFavorite: boolean }>(
    `/recipes/${recipeId}/favorite`,
  );
  return data.isFavorite;
}

export async function removeRecipeFromFavorites(
  recipeId: string,
): Promise<boolean> {
  const { data } = await api.delete<{ isFavorite: boolean }>(
    `/recipes/${recipeId}/favorite`,
  );
  return data.isFavorite;
}

export type CreateRecipePayload = {
  name: string;
  description: string;
  instructions: string;
  time: number;
  categoryId: string;
  areaId: string;
  ingredients: string[];
  img: File | null;
};

export type CreatedRecipe = {
  id: string;
};

export async function createRecipe(payload: CreateRecipePayload): Promise<CreatedRecipe> {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("description", payload.description);
  formData.append("instructions", payload.instructions);
  formData.append("time", String(payload.time));
  formData.append("categoryId", payload.categoryId);
  formData.append("areaId", payload.areaId);

  payload.ingredients.forEach((ing) => formData.append("ingredients", ing));

  if (payload.img) {
    formData.append("img", payload.img);
  }

  const { data } = await api.post<CreatedRecipe>("/recipes", formData);
  return data;
}