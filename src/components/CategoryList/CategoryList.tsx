import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { fetchCategories } from "../../store/slices/categoriesSlice";
import { getCategoryCardImage } from "../../utils/categoryImages";
import { getTabletCardSize, getDesktopCardSize, type CardSize } from "../../utils/categoryLayout";
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

  useEffect(() => {
    type LegacyMediaQueryList = MediaQueryList & {
      addListener: (listener: () => void) => void;
      removeListener: (listener: () => void) => void;
    };

    // Важливо: matchMedia дає стабільну поведінку на межах брейкпоінтів
    // і синхронізується з CSS @media (на відміну від window.innerWidth + resize).
    const mqlMobile = window.matchMedia("(max-width: 767.98px)");
    const mqlTablet = window.matchMedia("(min-width: 768px) and (max-width: 1439.98px)");
    const mqlDesktop = window.matchMedia("(min-width: 1440px)");

    const update = () => {
      if (mqlMobile.matches) setBreakpoint("mobile");
      else if (mqlTablet.matches) setBreakpoint("tablet");
      else if (mqlDesktop.matches) setBreakpoint("desktop");
    };

    // init
    update();

    // subscribe
    const subscribe = (mql: MediaQueryList) => {
      // Safari legacy fallback
      if (typeof mql.addEventListener === "function") mql.addEventListener("change", update);
      else (mql as LegacyMediaQueryList).addListener(update);

      return () => {
        if (typeof mql.removeEventListener === "function") mql.removeEventListener("change", update);
        else (mql as LegacyMediaQueryList).removeListener(update);
      };
    };

    const unsubMobile = subscribe(mqlMobile);
    const unsubTablet = subscribe(mqlTablet);
    const unsubDesktop = subscribe(mqlDesktop);

    return () => {
      unsubMobile();
      unsubTablet();
      unsubDesktop();
    };
  }, []);

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

  const maxByBreakpoint: Record<typeof breakpoint, number> = {
    mobile: 8,
    tablet: 11,
    desktop: 11,
  };

  const visibleCategories = categories.slice(0, maxByBreakpoint[breakpoint]);

  return (
    <div className={styles.list}>
      {visibleCategories.map((category, index) => {
        let cardSize: CardSize = "small";
        if (breakpoint === "tablet") {
          cardSize = getTabletCardSize(index);
        } else if (breakpoint === "desktop") {
          cardSize = getDesktopCardSize(index);
        }

        const image = getCategoryCardImage(category.name);

        return <CategoryCard key={category.id} category={category} onArrowClick={() => handleCategoryClick(category.id)} image={image} size={cardSize} />;
      })}

      <AllCategoriesCard onClick={handleAllCategoriesClick} />
    </div>
  );
};

export default CategoryList;
