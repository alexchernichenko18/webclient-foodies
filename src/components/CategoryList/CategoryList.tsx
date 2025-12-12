import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import { getCategoryImageSourceSet } from "../../utils/categoryImages";
import { getTabletCardSize, getDesktopCardSize, getImageSize, type CardSize } from "../../utils/categoryLayout";
import CategoryCard from "../CategoryCard";
import AllCategoriesCard from "../AllCategoriesCard";
import styles from "./CategoryList.module.scss";

interface CategoryListProps {
  onCategoryClick: (categoryId: string | null) => void;
}

const CategoryList = ({ onCategoryClick }: CategoryListProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, loading, error } = useSelector((state: RootState) => state.categories);
  const [breakpoint, setBreakpoint] = useState<"mobile" | "tablet" | "desktop">("desktop");

  // Визначаємо breakpoint на основі ширини екрану
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setBreakpoint("mobile");
      } else if (width < 1440) {
        setBreakpoint("tablet");
      } else {
        setBreakpoint("desktop");
      }
    };

    updateBreakpoint();
    window.addEventListener("resize", updateBreakpoint);
    return () => window.removeEventListener("resize", updateBreakpoint);
  }, []);

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
      {categories.map((category, index) => {
        // Визначаємо розмір картки залежно від breakpoint
        let cardSize: CardSize = "small";
        if (breakpoint === "tablet") {
          cardSize = getTabletCardSize(category.name, index);
        } else if (breakpoint === "desktop") {
          cardSize = getDesktopCardSize(category.name, index);
        }

        // Визначаємо розмір зображення для завантаження
        const imageSize = getImageSize(category.name, breakpoint, cardSize);
        const image = getCategoryImageSourceSet(category.name, breakpoint, imageSize);

        return <CategoryCard key={category.id} category={category} onArrowClick={() => handleCategoryClick(category.id)} image={image} size={cardSize} />;
      })}
      <AllCategoriesCard onClick={handleAllCategoriesClick} />
    </div>
  );
};

export default CategoryList;
