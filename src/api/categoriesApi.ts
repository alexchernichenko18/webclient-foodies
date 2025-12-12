import api from "./client";
import type { Category } from "../types/category";

export const getCategoriesRequest = () => {
  console.log("getCategoriesRequest called, baseURL:", api.defaults.baseURL);
  return api.get<Category[]>("/categories");
};
