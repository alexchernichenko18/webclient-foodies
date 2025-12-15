import { useState } from "react";
import { useSelector } from "react-redux";
import Categories from "../../components/Categories";
import MainTitle from "../../components/ui/MainTitle";
import { RootState } from "../../store";
import styles from "./Main.module.scss";

const Main = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);
  const [showRecipes, setShowRecipes] = useState(false);
  const { categories } = useSelector((state: RootState) => state.categories);

  const handleCategoryClick = async (categoryId: string | null) => {
    try {
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

      // TODO: Коли буде готовий компонент Recipes, додати:
      // - Запит на backend за рецептами (без фільтру по категорії якщо categoryId === null)
      // - Обробку помилок з notification
      // - Відображення компонента Recipes замість Categories
      console.log("Category selected:", categoryId, categoryName);
    } catch (error) {
      // TODO: Показати notification з помилкою
      alert("Failed to load recipes. Please try again.");
      console.error("Error loading recipes:", error);
    }
  };

  const handleBackClick = () => {
    setShowRecipes(false);
    setSelectedCategoryId(null);
    setSelectedCategoryName(null);
  };

  return (
    <div className={styles.wrap}>
      {!showRecipes && <Categories onCategoryClick={handleCategoryClick} />}
      {showRecipes && (
        <div>
          {/* TODO: Додати компонент Recipes коли він буде готовий */}
          <MainTitle>{selectedCategoryName || "All categories"}</MainTitle>
          <button onClick={handleBackClick}>Back to Categories</button>
          <p>Recipes will be displayed here (categoryId: {selectedCategoryId || "null - all categories"})</p>
        </div>
      )}
    </div>
  );
};

export default Main;
