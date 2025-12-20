import { useState } from "react";
import { useSelector } from "react-redux";
import Categories from "../../components/Categories";
import Recipes from "../../components/Recipes";
import { RootState } from "../../store";
import { getRecipes, type Recipe } from "../../api/recipes";
import styles from "./Main.module.scss";

const Main = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [showRecipes, setShowRecipes] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    ingredientId: "",
    areaId: "",
  });
  const { categories } = useSelector((state: RootState) => state.categories);

  const loadRecipes = async (categoryId: string | null, ingredientId?: string, areaId?: string) => {
    try {
      setLoading(true);

      const response = await getRecipes({
        categoryId: categoryId,
        ingredientName: ingredientId || undefined,
        areaId: areaId || undefined,
        page: 1,
        limit: 10,
      });

      setRecipes(response.recipes);
      console.log("Recipes loaded:", response);
      // Діагностика: перевіряємо чи є isFavorite в рецептах
      response.recipes.forEach((recipe, index) => {
        console.log(`Recipe ${index} (${recipe.name}): isFavorite =`, recipe.isFavorite);
      });
    } catch (error) {
      alert("Failed to load recipes. Please try again.");
      console.error("Error loading recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = async (categoryId: string | null) => {
    // Визначаємо назву категорії для відображення
    let categoryName: string | null = null;
    if (categoryId) {
      const category = categories.find((cat) => cat.id === categoryId);
      categoryName = category?.name || null;
    } else {
      categoryName = "All categories";
    }

    setSelectedCategoryId(categoryId);
    setSelectedCategoryName(categoryName);
    setShowRecipes(true);
    setFilters({ ingredientId: "", areaId: "" }); // Скидаємо фільтри

    await loadRecipes(categoryId);
  };

  const handleFilterChange = (selectedId: string, filterType: "ingredients" | "areas") => {
    console.log(`Filter changed - Type: ${filterType}, ID: ${selectedId}`);

    const newFilters = {
      ...filters,
      [filterType === "ingredients" ? "ingredientId" : "areaId"]: selectedId,
    };

    setFilters(newFilters);

    // Перезавантажуємо рецепти з новими фільтрами
    loadRecipes(selectedCategoryId, newFilters.ingredientId, newFilters.areaId);
  };

  const handleBackClick = () => {
    setShowRecipes(false);
    setSelectedCategoryId(null);
    setSelectedCategoryName(null);
    setRecipes([]);
    setFilters({ ingredientId: "", areaId: "" });
  };

  const handleFavoriteChange = (recipeId: string, isFavorite: boolean) => {
    // Оновлюємо локальний стейт для синхронізації
    // API вже оновив стан на сервері, тому просто синхронізуємо локальний стейт
    setRecipes((prevRecipes) => prevRecipes.map((recipe) => (recipe.id === recipeId ? { ...recipe, isFavorite } : recipe)));
  };

  return (
    <div className={styles.wrap}>
      {!showRecipes && <Categories onCategoryClick={handleCategoryClick} />}
      {showRecipes && (
        <Recipes recipes={recipes} loading={loading} onBack={handleBackClick} categoryName={selectedCategoryName} onFilterChange={handleFilterChange} onFavoriteChange={handleFavoriteChange} />
      )}
    </div>
  );
};

export default Main;
