import { type Recipe } from "../../../api/recipes";
import RecipeCard from "../RecipeCard";
import styles from "./RecipesList.module.scss";

interface RecipesListProps {
  recipes: Recipe[];
}

const RecipesList = ({ recipes }: RecipesListProps) => {
  if (recipes.length === 0) {
    return (
      <div className={styles.empty}>
        <p>No recipes found</p>
      </div>
    );
  }

  return (
    <ul className={styles.list}>
      {recipes.map((recipe) => (
        <li key={recipe.id} className={styles.item}>
          <RecipeCard recipe={recipe} isFavorite={recipe.isFavorite} />
        </li>
      ))}
    </ul>
  );
};

export default RecipesList;
