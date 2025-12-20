import { useRef, useEffect } from "react";
import { type Recipe } from "../../api/recipes";
import MainTitle from "../ui/MainTitle";
import Subtitle from "../ui/Subtitle";
import RecipesList from "./RecipesList/RecipesList";
import RecipeFilters from "./RecipeFilters/RecipeFilters";
import styles from "./Recipes.module.scss";

interface RecipesProps {
  recipes: Recipe[];
  loading: boolean;
  onBack: () => void;
  categoryName: string | null;
  onFilterChange: (selectedId: string, filterType: "ingredients" | "areas") => void;
  onFavoriteChange?: (recipeId: string, isFavorite: boolean) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Recipes = ({ 
  recipes, 
  loading, 
  onBack, 
  categoryName, 
  onFilterChange, 
  onFavoriteChange,
  currentPage,
  totalPages,
  onPageChange
}: RecipesProps) => {
  
  const sectionRef = useRef<HTMLElement>(null);
  
  // Прокручування до початку списку при зміні сторінки
  useEffect(() => {
    if (sectionRef.current && currentPage > 1) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [currentPage]);
  
  // Функція для генерації масиву номерів сторінок
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    if (totalPages <= 7) {
      // Якщо сторінок мало (до 7), показуємо всі
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Якщо сторінок багато, показуємо з ellipsis
      
      // Завжди показуємо першу сторінку
      pages.push(1);
      
      // Додаємо ellipsis якщо потрібно
      if (currentPage > 3) {
        pages.push('...');
      }
      
      // Показуємо сторінки навколо поточної
      for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
        pages.push(i);
      }
      
      // Додаємо ellipsis якщо потрібно
      if (currentPage < totalPages - 2) {
        pages.push('...');
      }
      
      // Завжди показуємо останню сторінку
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <section className={styles.recipes} ref={sectionRef}>
      <div className={styles.container}>
        <button onClick={onBack} className={styles.backButton}>
          ← BACK
        </button>

        <div className={styles.header}>
          <MainTitle>{categoryName || "ALL CATEGORIES"}</MainTitle>
          <Subtitle>
            Go on a taste journey, where every sip is a sophisticated creative chord, and every dessert is an expression of the most refined gastronomic desires.
          </Subtitle>
        </div>

        <div className={styles.content}>
          <aside className={styles.sidebar}>
            <RecipeFilters 
              recipes={recipes} 
              changeHandler={onFilterChange} 
            />
          </aside>

          <div className={styles.main}>
            {loading ? (
              <p className={styles.loading}>Loading recipes...</p>
            ) : (
              <>
                <RecipesList recipes={recipes} onFavoriteChange={onFavoriteChange} />

                {/* Пагінація - показуємо тільки якщо є більше 1 сторінки */}
                {totalPages > 1 && (
                  <div className={styles.pagination}>
                    {/* Кнопка "Попередня сторінка" */}
                    <button 
                      className={styles.pageButton}
                      onClick={() => onPageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      aria-label="Previous page"
                    >
                      ←
                    </button>
                    
                    {/* Номери сторінок */}
                    {getPageNumbers().map((page, index) => (
                      page === '...' ? (
                        <span 
                          key={`ellipsis-${index}`} 
                          className={styles.ellipsis}
                        >
                          ...
                        </span>
                      ) : (
                        <button 
                          key={page}
                          className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
                          onClick={() => onPageChange(page as number)}
                          aria-label={`Go to page ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      )
                    ))}
                    
                    {/* Кнопка "Наступна сторінка" */}
                    <button 
                      className={styles.pageButton}
                      onClick={() => onPageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      aria-label="Next page"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipes;