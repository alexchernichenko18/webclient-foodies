import styles from "./RecipeMiniCard.module.scss";
import type { RecipeListItem } from "../../api/recipes";
import Image from "../Image";

interface RecipeMiniCardProps {
  recipe: RecipeListItem;
  onToggleFavorite?: (recipeId: string, isFavorite: boolean) => void;
}

const RecipeMiniCard = ({ recipe, onToggleFavorite }: RecipeMiniCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.thumbWrap}>
        <Image
          className={styles.thumb}
          src={recipe.imageUrl || "/images/recipe-placeholder.jpg"}
          alt={recipe.title}
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{recipe.title}</h3>
        <p className={styles.desc}>{recipe.description}</p>

        <div className={styles.meta}>
          <span className={styles.time}>{recipe.time} min</span>

          <button
            type="button"
            className={`${styles.favBtn} ${
              recipe.isFavorite ? styles.favActive : ""
            }`}
            onClick={() => onToggleFavorite?.(recipe.id, recipe.isFavorite)}
            aria-label={
              recipe.isFavorite ? "Remove from favorites" : "Add to favorites"
            }
          >
            ♥
          </button>
        </div>
      </div>
    </article>
  );
};

export default RecipeMiniCard;
