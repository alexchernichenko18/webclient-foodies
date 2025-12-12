import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import { getCategoryImageUrl } from "../../utils/categoryImages";
import CategoryCard from "../CategoryCard";
import AllCategoriesCard from "../AllCategoriesCard";
import styles from "./CategoryList.module.scss";

interface CategoryListProps {
  onCategoryClick: (categoryId: string | null) => void;
}

const CategoryList = ({ onCategoryClick }: CategoryListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector((state: RootState) => state.categories);

  // Завантажуємо категорії при монтуванні, якщо їх ще немає
  React.useEffect(() => {
    if (categories.length === 0 && !loading) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories.length, loading]);

  const handleCategoryClick = (categoryId: string) => {
    onCategoryClick(categoryId);
  };

  const handleAllCategoriesClick = () => {
    onCategoryClick(null);
  };

  if (loading) {
    return <div className={styles.loading}>Loading categories...</div>;
  }

  if (error) {
    return <div className={styles.error}>Error: {error}</div>;
  }

  return (
    <div className={styles.list}>
      {categories.map((category) => {
        const imageUrl = getCategoryImageUrl(category.name);
        return <CategoryCard key={category.id} category={category} onClick={() => handleCategoryClick(category.id)} imageUrl={imageUrl} />;
      })}
      <AllCategoriesCard onClick={handleAllCategoriesClick} />
    </div>
  );
};

export default CategoryList;
