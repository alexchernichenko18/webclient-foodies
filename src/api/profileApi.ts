import api from "./client";
import type { User } from "./userApi";
import type { Recipe } from "./recipes";

export const profileApi = {
  getMyFollowers: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users/me/followers");
    return data;
  },

  getMyFollowing: async (): Promise<User[]> => {
    const { data } = await api.get<User[]>("/users/me/following");
    return data;
  },

  getMyRecipes: async (): Promise<Recipe[]> => {
    const { data } = await api.get<Recipe[]>("/recipes/me");
    return data;
  },

  getMyFavorites: async (): Promise<Recipe[]> => {
    const { data } = await api.get<{ recipes: Recipe[] }>("/recipes/favorites");
    return data.recipes;
  },

  followUser: async (userId: string): Promise<void> => {
    await api.post(`/users/${userId}/follow`);
  },

  unfollowUser: async (userId: string): Promise<void> => {
    await api.delete(`/users/${userId}/follow`);
  },

  getUserFollowers: async (userId: string): Promise<User[]> => {
    const { data } = await api.get<User[]>(`/users/${userId}/followers`);
    return data;
  },

  getUserRecipes: async (userId: string): Promise<Recipe[]> => {
    const { data } = await api.get<Recipe[]>(`/recipes/user/${userId}`);
    return data;
  },

  deleteMyRecipe: async (recipeId: string): Promise<void> => {
    await api.delete(`/recipes/${recipeId}`);
  },

  removeFromFavorites: async (recipeId: string): Promise<void> => {
    await api.delete(`/recipes/${recipeId}/favorite`);
  },
};