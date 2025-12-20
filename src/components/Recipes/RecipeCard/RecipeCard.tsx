import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  addRecipeToFavorites,
  removeRecipeFromFavorites,
  type Recipe,
} from "../../../api/recipes";
import { RootState } from "../../../store";
import styles from "./RecipeCard.module.scss";
import Button from "../../ui/Button";
import { ReactComponent as IconArrowUp } from "../../../assets/icons/icon-arrow-up.svg";
import { ReactComponent as IconHeart } from "../../../assets/icons/icon-heart.svg";
import Avatar from "../../Avatar";
import Image from "../../Image";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite?: boolean;
}

const RecipeCard = ({ recipe, isFavorite = false }: RecipeCardProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const [favorite, setFavorite] = useState(isFavorite);
  const [favPending, setFavPending] = useState(false);

  useEffect(() => {
    setFavorite(isFavorite);
  }, [isFavorite]);

  async function handleFavoriteClick() {
    if (!isAuthenticated || favPending) return;

    try {
      setFavPending(true);

      const nextIsFavorite = favorite
        ? await removeRecipeFromFavorites(recipe.id)
        : await addRecipeToFavorites(recipe.id);

      setFavorite(nextIsFavorite);
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Failed to update favorites";
      alert(message);
    } finally {
      setFavPending(false);
    }
  }

  const authorName = "Author";

  return (
    <div className={styles.card}>
      <Image
        src={recipe.img}
        className={styles.image}
        alt={recipe.name}
      />

      <h3 className={styles.title}>{recipe.name}</h3>
      <p className={styles.text}>{recipe.description}</p>

      <div className={styles.info}>
        <div className={styles.userInfo}>
          <div className={styles.avatarContainer}>
            <Avatar />
          </div>
          <h4 className={styles.name}>{authorName}</h4>
        </div>

        <div className={styles.buttons}>
          {isAuthenticated && (
            <Button
              onClick={handleFavoriteClick}
              variant={favorite ? "dark" : "light"}
              icon={<IconHeart />}
              disabled={favPending}
            />
          )}

          <Button href={`/recipe/${recipe.id}`} variant="light" icon={<IconArrowUp />} />
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;