import api from "./client";

export type ApiAuthor = {
  id: string;
  name: string;
  avatarUrl: string | null;
};

export type RecipeListItem = {
  id: string;
  title: string;
  description: string;
  time: number;
  imageUrl: string;
  author: ApiAuthor | null;
  favoritesCount: number;
  isFavorite: boolean;
};

export type PopularRecipe = RecipeListItem;

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

type ListResponse<T> = {
  items: T[];
  total?: number;
  totalPages?: number;
  page?: number;
  limit?: number;
};

function normalizeListResponse<T>(data: any): ListResponse<T> {
  if (!data) return { items: [] };

  if (Array.isArray(data.items)) return data as ListResponse<T>;

  if (data.data) {
    if (Array.isArray(data.data.items)) return data.data as ListResponse<T>;
    if (Array.isArray(data.data)) return { items: data.data as T[] };
  }

  if (Array.isArray(data)) return { items: data as T[] };

  return { items: [] };
}

export async function getPopularRecipes(limit = 4): Promise<PopularRecipe[]> {
  const { data } = await api.get<{ items: PopularRecipe[] }>("/recipes/popular", {
    params: { limit },
  });
  return data.items;
}

export async function getOwnRecipes(params?: {
  page?: number;
  limit?: number;
}): Promise<ListResponse<RecipeListItem>> {
  const { data } = await api.get("/recipes/own", { params });
  return normalizeListResponse<RecipeListItem>(data);
}

export async function getFavoriteRecipes(params?: {
  page?: number;
  limit?: number;
}): Promise<ListResponse<RecipeListItem>> {
  const { data } = await api.get("/recipes/favorites", { params });
  return normalizeListResponse<RecipeListItem>(data);
}

export async function getRecipeById(recipeId: string): Promise<RecipeDetails> {
  const { data } = await api.get<RecipeDetails>(`/recipes/${recipeId}`);
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
