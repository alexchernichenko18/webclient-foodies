import { useState } from "react";
import Categories from "../../components/Categories";
import styles from "./Main.module.scss";

const Main = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [showRecipes, setShowRecipes] = useState(false);

  const handleCategoryClick = async (categoryId: string | null) => {
    try {
      // TODO: Запит на backend за рецептами обраної категорії
      // Поки що просто встановлюємо стан
      setSelectedCategoryId(categoryId);
      setShowRecipes(true);

      // TODO: Коли буде готовий компонент Recipes, додати:
      // - Запит на backend за рецептами
      // - Обробку помилок з notification
      // - Відображення компонента Recipes замість Categories
      console.log("Category selected:", categoryId);
    } catch (error) {
      // TODO: Показати notification з помилкою
      alert("Failed to load recipes. Please try again.");
      console.error("Error loading recipes:", error);
    }
  };

  return (
    <div className={styles.wrap}>
      {!showRecipes && <Categories onCategoryClick={handleCategoryClick} />}
      {showRecipes && (
        <div>
          {/* TODO: Додати компонент Recipes коли він буде готовий */}
          <p>Recipes for category: {selectedCategoryId || "All categories"}</p>
          <button onClick={() => setShowRecipes(false)}>Back to Categories</button>
        </div>
      )}
    </div>
  );
};

export default Main;
