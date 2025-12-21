import styles from "./RecipeMiniCard.module.scss";
import type { Recipe } from "../../api/recipes";
import Image from "../Image";
import { ReactComponent as IconArrowUp } from "../../assets/icons/icon-arrow-up.svg";
import { ReactComponent as TrashIcon } from "../../assets/icons/icon-trash.svg";
import Button from "../ui/Button";

interface RecipeMiniCardProps {
  recipe: Recipe;
  onDelete?: (recipeId: string) => void;
}

const RecipeMiniCard = ({ recipe, onDelete }: RecipeMiniCardProps) => {
  return (
    <article className={styles.card}>
      <div className={styles.left}>
        <div className={styles.thumbWrap}>
          <Image
            className={styles.thumb}
            src={recipe.img || recipe.imageUrl || "/images/recipe-placeholder.jpg"}
            alt={recipe.name}
          />
        </div>

        <div className={styles.body}>
          <h3 className={styles.title}>{recipe.name}</h3>
          <p className={styles.desc}>{recipe.description}</p>
        </div>
      </div>

      <div className={styles.actions}>
        <Button variant="light" icon={<IconArrowUp />} href={`/recipe/${recipe.id}`} />
        {onDelete && (
          <Button variant="light" icon={<TrashIcon />} onClick={() => onDelete(recipe.id)} />
        )}
      </div>
    </article>
  );
};

export default RecipeMiniCard;
