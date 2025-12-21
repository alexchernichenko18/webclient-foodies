import { Link } from "react-router-dom";
import styles from "./RecipeMiniCard.module.scss";
import type { Recipe } from "../../api/recipes";
import Image from "../Image";
import { ReactComponent as ArrowIcon } from "../../assets/icons/icon-arrow-up.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/icon-trash.svg";

interface RecipeMiniCardProps {
  recipe: Recipe;
  onDelete?: (recipeId: string) => void;
}

const RecipeMiniCard = ({ recipe, onDelete }: RecipeMiniCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.thumbWrap}>
        <Image
          className={styles.thumb}
          src={recipe.img || "/images/recipe-placeholder.jpg"}
          alt={recipe.name}
        />
      </div>

      <div className={styles.body}>
        <h3 className={styles.title}>{recipe.name}</h3>
        <p className={styles.desc}>{recipe.description}</p>
      </div>

      <div className={styles.actions}>
        <Link to={`/recipe/${recipe.id}`} className={styles.arrowBtn}>
          <ArrowIcon className={styles.arrowIcon} />
        </Link>
        {onDelete && (
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={() => onDelete(recipe.id)}
            aria-label="Delete recipe"
          >
            <TrashIcon className={styles.trashIcon} />
          </button>
        )}
      </div>
    </article>
  );
};

export default RecipeMiniCard;
