import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { type Recipe } from "../../../api/recipes";
import { RootState } from "../../../store";
import noImage from "../../../assets/recipes/no-image.png";
import noAvatar from "../../../assets/recipes/no-avatar.jpg";
import icons from "../../../assets/icons/icon-plus.svg";
import styles from "./RecipeCard.module.scss";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite?: boolean;
}

const RecipeCard = ({ recipe, isFavorite = false }: RecipeCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  // Використовуємо isAuthenticated з вашого auth slice
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleFavoriteClick = () => {
    setFavorite(!favorite);
    // TODO: Додати виклик API для додавання/видалення з улюблених
    // addRecipeToFavorites або removeRecipeFromFavorites
  };

  // Отримуємо URL зображення
  const getImageUrl = (img: string | null) => {
    if (!img) return noImage;
    return img.startsWith("http") 
      ? img 
      : `${process.env.REACT_APP_BASE_URL}${img}`;
  };

  // Отримуємо дані автора - поки заглушка, потім з recipe
  const authorName = "Author"; // TODO: recipe.owner?.name || "Author"
  const authorAvatar = null; // TODO: recipe.owner?.avatar

  const getAvatarUrl = (avatar: string | null) => {
    if (!avatar) return noAvatar;
    return avatar.startsWith("http")
      ? avatar
      : `${process.env.REACT_APP_BASE_URL}${avatar}`;
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.image}
        src={getImageUrl(recipe.img)}
        alt={recipe.name}
      />
      
      <h3 className={styles.title}>{recipe.name}</h3>
      <p className={styles.text}>{recipe.description}</p>
      
      <div className={styles.info}>
        <div className={styles.userInfo}>
          <div className={styles.avatarContainer}>
            <img
              className={styles.avatar}
              src={getAvatarUrl(authorAvatar)}
              alt={authorName}
            />
          </div>
          <h4 className={styles.name}>{authorName}</h4>
        </div>
        
        <div className={styles.buttons}>
          {isAuthenticated && (
            <button
              className={`${styles.btn} ${favorite ? styles.btnFavoriteActive : ''}`}
              onClick={handleFavoriteClick}
              type="button"
              aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
            >
              <svg className={styles.icon}>
                <use href={`${icons}#icon-heart`}></use>
              </svg>
            </button>
          )}
          
          <NavLink
            to={`/recipe/${recipe.id}`}
            className={styles.btn}
          >
            <svg className={styles.icon}>
              <use href={`${icons}#icon-arrow-up-right`}></use>
            </svg>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;