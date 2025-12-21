import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCategoriesRequest } from "../../api/categoriesApi";
import type { Category } from "../../types/category";

export interface CategoriesState {
  categories: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<Category[], void, { rejectValue: string }>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await getCategoriesRequest();
    return response.data;
  } catch {
    return rejectWithValue("Failed to fetch categories");
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    resetCategoriesError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        // Сортуємо категорії по алфавіту
        const sortedCategories = [...(action.payload || [])].sort((a, b) => a.name.localeCompare(b.name));
        state.categories = sortedCategories;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch categories";
      });
  },
});

export const { resetCategoriesError } = categoriesSlice.actions;
export default categoriesSlice.reducer;
