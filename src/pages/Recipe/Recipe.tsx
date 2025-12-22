import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { openSignInModal } from "../../store/slices/modalSlice";
import { getCurrentUser } from "../../store/user/operations";
import styles from "./Recipe.module.scss";

import heartIcon from "../../assets/icons/icon-heart.svg";
import arrowUpIcon from "../../assets/icons/icon-arrow-up.svg";

import {
  addRecipeToFavorites,
  getPopularRecipes,
  getRecipeById,
  removeRecipeFromFavorites,
  type PopularRecipe,
  type RecipeDetails,
} from "../../api/recipes";

import { getIngredients, type IngredientDetails as FullIngredient } from "../../api/ingredients";

import Avatar from "../../components/Avatar";
import Image from "../../components/Image";
import Breadcrumbs from "../../components/Breadcrumbs";

type IngredientsById = Record<string, FullIngredient>;

const Recipe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const recipeId = useMemo(() => id?.trim() ?? "", [id]);

  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [popular, setPopular] = useState<PopularRecipe[]>([]);
  const [ingredientsById, setIngredientsById] = useState<IngredientsById>({});
  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [loadingPopular, setLoadingPopular] = useState(false);
  const [favPending, setFavPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isActive = true;

    getIngredients()
      .then((items) => {
        if (!isActive) return;

        const map = items.reduce<IngredientsById>((acc, ing) => {
          if (!ing.description) return acc;
          acc[ing.id] = ing;
          return acc;
        }, {});

        setIngredientsById(map);
      })
      .catch(() => {
        if (!isActive) return;
        setIngredientsById({});
      });

    return () => {
      isActive = false;
    };
  }, []);

  useEffect(() => {
    if (!recipeId) return;

    let isActive = true;
    setLoadingRecipe(true);
    setError(null);

    getRecipeById(recipeId)
      .then((data) => {
        if (!isActive) return;
        setRecipe(data);
      })
      .catch((e: unknown) => {
        if (!isActive) return;
        const message = e instanceof Error ? e.message : "Failed to load recipe";
        setError(message);
        setRecipe(null);
      })
      .finally(() => {
        if (!isActive) return;
        setLoadingRecipe(false);
      });

    return () => {
      isActive = false;
    };
  }, [recipeId]);

  useEffect(() => {
    let isActive = true;
    setLoadingPopular(true);

    getPopularRecipes(4)
      .then((items) => {
        if (!isActive) return;
        setPopular(items);
      })
      .catch(() => {
        if (!isActive) return;
        setPopular([]);
      })
      .finally(() => {
        if (!isActive) return;
        setLoadingPopular(false);
      });

    return () => {
      isActive = false;
    };
  }, []);

  async function toggleFavorite() {
    if (!recipe) return;
    
    if (!isAuthenticated) {
      dispatch(openSignInModal());
      return;
    }

    try {
      setFavPending(true);

      const nextIsFavorite = recipe.isFavorite
        ? await removeRecipeFromFavorites(recipe.id)
        : await addRecipeToFavorites(recipe.id);

      setRecipe((prev) => (prev ? { ...prev, isFavorite: nextIsFavorite } : prev));

      // Оновлюємо дані користувача після зміни favorites
      dispatch(getCurrentUser());
    } finally {
      setFavPending(false);
    }
  }

  function openRecipe(nextId: string) {
    navigate(`/recipe/${nextId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function togglePopularFavorite(e: React.MouseEvent, item: PopularRecipe) {
    e.stopPropagation();

    if (!isAuthenticated) {
      dispatch(openSignInModal());
      return;
    }

    const nextIsFavorite = item.isFavorite
      ? await removeRecipeFromFavorites(item.id)
      : await addRecipeToFavorites(item.id);

    setPopular((prev) =>
      prev.map((p) => (p.id === item.id ? { ...p, isFavorite: nextIsFavorite } : p)),
    );

    // Оновлюємо дані користувача після зміни favorites
    dispatch(getCurrentUser());
  }

  function openPopularInNewTab(e: React.MouseEvent, nextId: string) {
    e.stopPropagation();
    window.open(`/recipe/${nextId}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: recipe?.title ?? "Recipe" },
          ]}
        />

        {!recipeId && <p className={styles.stateText}>Recipe id is missing.</p>}
        {loadingRecipe && <p className={styles.stateText}>Loading recipe...</p>}
        {!loadingRecipe && error && <p className={styles.stateText}>{error}</p>}

        {!loadingRecipe && !error && recipe && (
          <section className={styles.topSection}>
            <div className={styles.topGrid}>
              <div className={styles.imageWrap}>
                <Image src={recipe.imageUrl} className={styles.image} alt={recipe.title} />
              </div>

              <div className={styles.content}>
                <h1 className={styles.title}>{recipe.title}</h1>

                <div className={styles.pills}>
                  {recipe.category?.name && (
                    <span className={styles.pill}>{recipe.category.name}</span>
                  )}
                  {!!recipe.time && <span className={styles.pill}>{recipe.time} min</span>}
                </div>

                <p className={styles.description}>{recipe.description}</p>

                {recipe.author && (
                  <div 
                    className={styles.authorRow}
                    onClick={() => {
                      if (!isAuthenticated) {
                        dispatch(openSignInModal());
                      } else {
                        navigate(`/profile/${recipe.author?.id}`);
                      }
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    <div className={styles.authorAvatar}>
                      <Avatar src={recipe.author.avatarUrl ?? undefined} alt={recipe.author.name} />
                    </div>

                    <div className={styles.authorInfo}>
                      <span className={styles.authorLabel}>Created by:</span>
                      <span className={styles.authorName}>{recipe.author.name}</span>
                    </div>
                  </div>
                )}

                <h2 className={styles.sectionTitle}>Ingredients</h2>

                <ul className={styles.ingredientsGrid}>
                  {recipe.ingredients.map((ing) => {
                    const full = ingredientsById[ing.name || ing.id];
                    const name = full?.name ?? ing.name;
                    const imageUrl = full?.img ?? ing.imageUrl;
                    const measure = ing.measure ?? full?.measure ?? "";

                    return (
                      <li key={ing.id} className={styles.ingredientItem}>
                        <div className={styles.ingredientIcon}>
                          <Image src={imageUrl} alt={name} className={styles.ingredientImage} />
                        </div>

                        <div className={styles.ingredientMeta}>
                          <span className={styles.ingredientName}>{name}</span>
                          <span className={styles.ingredientMeasure}>{measure}</span>
                        </div>
                      </li>
                    );
                  })}
                </ul>

                <h2 className={styles.sectionTitle}>Recipe Preparation</h2>
                <p className={styles.instructions}>{recipe.instructions}</p>

                <div className={styles.buttonRow}>
                  <button
                    type="button"
                    className={styles.favButton}
                    onClick={toggleFavorite}
                    disabled={favPending}
                  >
                    {recipe.isFavorite ? "Remove from favorites" : "Add to favorites"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        <section className={styles.popularSection}>
          <h2 className={styles.popularTitle}>Popular Recipes</h2>

          {loadingPopular && <p className={styles.stateText}>Loading popular recipes...</p>}
          {!loadingPopular && popular.length === 0 && (
            <p className={styles.stateText}>No popular recipes yet.</p>
          )}

          {!loadingPopular && popular.length > 0 && (
            <ul className={styles.popularGrid}>
              {popular.map((item) => (
                <li
                  key={item.id}
                  className={styles.popularCard}
                  onClick={() => openRecipe(item.id)}
                >
                  <div className={styles.popularImageWrap}>
                    <Image src={item.imageUrl} alt={item.title} className={styles.popularImage} />
                  </div>

                  <div className={styles.popularText}>
                    <h3 className={styles.popularCardTitle}>{item.title}</h3>
                    <p className={styles.popularCardDesc}>{item.description}</p>
                  </div>

                  <div className={styles.popularFooter}>
                    <div
                      className={styles.popularAuthor}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isAuthenticated) {
                          dispatch(openSignInModal());
                        } else {
                          navigate(`/profile/${item.author?.id}`);
                        }
                      }}
                    >
                      <div className={styles.popularAvatar}>
                        <Avatar
                          src={item.author?.avatarUrl ?? undefined}
                          alt={item.author?.name ?? "User"}
                        />
                      </div>
                      <span className={styles.popularAuthorName}>
                        {item.author?.name ?? ""}
                      </span>
                    </div>

                    <div className={styles.popularActions}>
                      <button
                        type="button"
                        className={`${styles.popularIconBtn} ${item.isFavorite ? styles.popularIconBtnActive : ""
                          }`}
                        onClick={(e) => togglePopularFavorite(e, item)}
                      >
                        <img src={heartIcon} alt="" width={18} height={18} />
                      </button>
                      <button
                        type="button"
                        className={styles.popularIconBtn}
                        onClick={(e) => openPopularInNewTab(e, item.id)}
                      >
                        <img src={arrowUpIcon} alt="" width={18} height={18} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default Recipe;