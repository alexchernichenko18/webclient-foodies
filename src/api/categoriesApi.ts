import api from "./client";
import type { Category } from "../types/category";

export const getCategoriesRequest = () => {
  return api.get<Category[]>("/categories");
};
