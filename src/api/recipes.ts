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

export type Recipe = {
  id: string;
  name: string;
  description: string;
  instructions: string;
  time: number;
  img: string | null;
  isFavorite?: boolean;
  category?: {
    id: string;
    name: string;
  };
  area?: {
    id: string;
    name: string;
  };
  ingredients?: RecipeIngredientDTO[];
};

export type RecipeFilters = {
  categoryId?: string | null;
  areaId?: string | null;
  ingredientName?: string | null;
  ownerId?: string | null;
  page?: number;
  limit?: number;
};

export type RecipesResponse = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  recipes: Recipe[];
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

export async function getRecipes(filters: RecipeFilters = {}): Promise<RecipesResponse> {
  const { data } = await api.get<RecipesResponse>("/recipes", {
    params: {
      categoryId: filters.categoryId || undefined,
      areaId: filters.areaId || undefined,
      ingredientName: filters.ingredientName || undefined,
      ownerId: filters.ownerId || undefined,
      page: filters.page || 1,
      limit: filters.limit || 10,
    },
  });
  return data;
}

export async function addRecipeToFavorites(recipeId: string): Promise<boolean> {
  const { data } = await api.post<{ isFavorite: boolean }>(`/recipes/${recipeId}/favorite`);
  return data.isFavorite;
}

export async function removeRecipeFromFavorites(recipeId: string): Promise<boolean> {
  const { data } = await api.delete<{ isFavorite: boolean }>(`/recipes/${recipeId}/favorite`);
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
