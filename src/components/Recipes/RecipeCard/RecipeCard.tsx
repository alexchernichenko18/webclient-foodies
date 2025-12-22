import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { addRecipeToFavorites, removeRecipeFromFavorites, type Recipe } from "../../../api/recipes";
import { RootState } from "../../../store";
import { openSignInModal } from "../../../store/slices/modalSlice";
import { getCurrentUser } from "../../../store/user/operations";
import styles from "./RecipeCard.module.scss";
import Button from "../../ui/Button";
import { ReactComponent as IconArrowUp } from "../../../assets/icons/icon-arrow-up.svg";
import { ReactComponent as IconHeart } from "../../../assets/icons/icon-heart.svg";
import Avatar from "../../Avatar";
import Image from "../../Image";
import { useNavigate } from "react-router-dom";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite?: boolean;
  onFavoriteChange?: (recipeId: string, isFavorite: boolean) => void;
}

const RecipeCard = ({ recipe, isFavorite = false, onFavoriteChange }: RecipeCardProps) => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  // Використовуємо recipe.isFavorite якщо воно є, інакше isFavorite проп
  const favoriteFromProps = recipe.isFavorite ?? isFavorite ?? false;
  // Локальний стейт для оптимістичного оновлення (миттєва зміна UI)
  const [favorite, setFavorite] = useState(favoriteFromProps);
  const [favPending, setFavPending] = useState(false);
  // Відстежуємо, чи ми оновлюємо favorite через клік (щоб useEffect не перезаписував)
  const isUpdatingFromClick = useRef(false);

  useEffect(() => {
    if (!isUpdatingFromClick.current) {
      setFavorite(favoriteFromProps);
    }
  }, [favoriteFromProps]);

  async function handleFavoriteClick() {
    if (!isAuthenticated) {
      dispatch(openSignInModal());
      return;
    }
    if (favPending) return;

    // Зберігаємо попереднє значення на випадок помилки
    const previousFavorite = favorite;
    // Оптимістичне оновлення - одразу змінюємо UI
    const optimisticFavorite = !favorite;
    isUpdatingFromClick.current = true; // Позначаємо, що ми оновлюємо через клік
    setFavorite(optimisticFavorite); // Синхронне оновлення для миттєвої зміни UI

    try {
      setFavPending(true);

      const nextIsFavorite = previousFavorite ? await removeRecipeFromFavorites(recipe.id) : await addRecipeToFavorites(recipe.id);

      // Оновлюємо локальний стейт з результатом API (на випадок якщо API поверне інше значення)
      setFavorite(nextIsFavorite);

      // Синхронізуємо стан з батьківським компонентом
      if (onFavoriteChange) {
        onFavoriteChange(recipe.id, nextIsFavorite);
      }

      // Оновлюємо дані користувача після зміни favorites
      dispatch(getCurrentUser());

      // Після синхронізації дозволяємо useEffect оновлювати з пропів
      // Використовуємо setTimeout, щоб дати час React оновити пропи
      setTimeout(() => {
        isUpdatingFromClick.current = false;
      }, 200);
    } catch (e: unknown) {
      // При помилці повертаємо попереднє значення
      setFavorite(previousFavorite);
      isUpdatingFromClick.current = false;
      const message = e instanceof Error ? e.message : "Failed to update favorites";
      iziToast.error({ title: "Error", message });
    } finally {
      setFavPending(false);
    }
  }

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
        <div
          className={styles.userInfo}
          onClick={(e) => {
            e.preventDefault();
            if (!isAuthenticated) {
              dispatch(openSignInModal());
            } else {
              navigate(`/profile/${recipe.owner?.id}`);
            }
          }}
          style={{ cursor: 'pointer' }}
        >
          <div className={styles.avatarContainer}>
            <Avatar src={recipe?.owner?.avatar} alt={recipe?.owner?.name} />
          </div>
          <h4 className={styles.name}>{recipe?.owner?.name}</h4>
        </div>

        <div className={styles.buttons}>
          <Button key={`favorite-${recipe.id}-${favorite}`} onClick={handleFavoriteClick} variant={favorite ? "dark" : "light"} icon={<IconHeart />} disabled={favPending} />

          <Button href={`/recipe/${recipe.id}`} variant="light" icon={<IconArrowUp />} />
        </div>
      </div>
    </div >
  );
};

export default RecipeCard;
