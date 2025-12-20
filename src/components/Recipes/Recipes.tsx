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
}

const Recipes = ({ recipes, loading, onBack, categoryName, onFilterChange, onFavoriteChange }: RecipesProps) => {
  return (
    <section className={styles.recipes}>
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

                {/* Пагінація */}
                <div className={styles.pagination}>
                  <button className={styles.pageButton}>1</button>
                  <button className={styles.pageButton}>2</button>
                  <button className={styles.pageButton}>3</button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Recipes;