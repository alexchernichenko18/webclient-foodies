import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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

const Recipe = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const recipeId = useMemo(() => id?.trim() ?? "", [id]);

  const [recipe, setRecipe] = useState<RecipeDetails | null>(null);
  const [popular, setPopular] = useState<PopularRecipe[]>([]);

  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [loadingPopular, setLoadingPopular] = useState(false);

  const [favPending, setFavPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      .catch((e) => {
        if (!isActive) return;
        setError(e?.message ?? "Failed to load recipe");
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

    try {
      setFavPending(true);

      const nextIsFavorite = recipe.isFavorite
        ? await removeRecipeFromFavorites(recipe.id)
        : await addRecipeToFavorites(recipe.id);

      setRecipe((prev) => (prev ? { ...prev, isFavorite: nextIsFavorite } : prev));
    } catch (e: any) {
      alert(e?.message ?? "Failed to update favorites");
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

    try {
      const nextIsFavorite = item.isFavorite
        ? await removeRecipeFromFavorites(item.id)
        : await addRecipeToFavorites(item.id);

      setPopular((prev) =>
        prev.map((p) => (p.id === item.id ? { ...p, isFavorite: nextIsFavorite } : p)),
      );
    } catch (e: any) {
      alert(e?.message ?? "Failed to update favorites");
    }
  }

  function openPopularInNewTab(e: React.MouseEvent, nextId: string) {
    e.stopPropagation();
    window.open(`/recipe/${nextId}`, "_blank", "noopener,noreferrer");
  }

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link to="/" className={styles.breadcrumbLink}>
            Home
          </Link>
          <span className={styles.breadcrumbSep}>/</span>
          <span className={styles.breadcrumbCurrent}>{recipe?.title ?? "Recipe"}</span>
        </div>

        {!recipeId && <p className={styles.stateText}>Recipe id is missing.</p>}
        {loadingRecipe && <p className={styles.stateText}>Loading recipe...</p>}
        {!loadingRecipe && error && <p className={styles.stateText}>{error}</p>}

        {!loadingRecipe && !error && recipe && (
          <section className={styles.topSection}>
            <div className={styles.topGrid}>
              <div className={styles.imageWrap}>
                <img className={styles.image} src={recipe.imageUrl} alt={recipe.title} />
              </div>

              <div className={styles.content}>
                <h1 className={styles.title}>{recipe.title}</h1>

                <div className={styles.pills}>
                  {recipe.category?.name && <span className={styles.pill}>{recipe.category.name}</span>}
                  {!!recipe.time && <span className={styles.pill}>{recipe.time} min</span>}
                </div>

                <p className={styles.description}>{recipe.description}</p>

                {recipe.author && (
                  <div className={styles.authorRow}>
                    <div className={styles.authorAvatar}>
                      {recipe.author.avatarUrl ? (
                        <img src={recipe.author.avatarUrl} alt={recipe.author.name} />
                      ) : (
                        <span>{recipe.author.name?.[0]?.toUpperCase() ?? "U"}</span>
                      )}
                    </div>

                    <div className={styles.authorInfo}>
                      <span className={styles.authorLabel}>Created by:</span>
                      <span className={styles.authorName}>{recipe.author.name}</span>
                    </div>
                  </div>
                )}

                <h2 className={styles.sectionTitle}>Ingredients</h2>

                <ul className={styles.ingredientsGrid}>
                  {recipe.ingredients.map((ing) => (
                    <li key={ing.id} className={styles.ingredientItem}>
                      <div className={styles.ingredientIcon}>
                        <img src={ing.imageUrl} alt={ing.name} />
                      </div>

                      <div className={styles.ingredientMeta}>
                        <span className={styles.ingredientName}>{ing.name}</span>
                        <span className={styles.ingredientMeasure}>{ing.measure ?? ""}</span>
                      </div>
                    </li>
                  ))}
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
          {!loadingPopular && popular.length === 0 && <p className={styles.stateText}>No popular recipes yet.</p>}

          {!loadingPopular && popular.length > 0 && (
            <ul className={styles.popularGrid}>
              {popular.map((item) => (
                <li
                  key={item.id}
                  className={styles.popularCard}
                  onClick={() => openRecipe(item.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") openRecipe(item.id);
                  }}
                >
                  <div className={styles.popularImageWrap}>
                    <img src={item.imageUrl} alt={item.title} />
                  </div>

                  <div className={styles.popularText}>
                    <h3 className={styles.popularCardTitle}>{item.title}</h3>
                    <p className={styles.popularCardDesc}>{item.description}</p>
                  </div>

                  <div className={styles.popularFooter}>
                    <div className={styles.popularAuthor}>
                      <div className={styles.popularAvatar}>
                        {item.author?.avatarUrl ? (
                          <img src={item.author.avatarUrl} alt={item.author.name} />
                        ) : (
                          <span>{item.author?.name?.[0]?.toUpperCase() ?? "U"}</span>
                        )}
                      </div>
                      <span className={styles.popularAuthorName}>{item.author?.name ?? ""}</span>
                    </div>

                    <div className={styles.popularActions}>
                      <button
                        type="button"
                        aria-label={item.isFavorite ? "Remove from favorites" : "Add to favorites"}
                        className={`${styles.popularIconBtn} ${item.isFavorite ? styles.popularIconBtnActive : ""}`}
                        onClick={(e) => togglePopularFavorite(e, item)}
                      >
                        <img className={styles.icon} src={heartIcon} alt="" width={18} height={18} />
                      </button>
                      <button
                        type="button"
                        className={styles.popularIconBtn}
                        aria-label="Open recipe"
                        onClick={(e) => openPopularInNewTab(e, item.id)}
                      >
                        <img className={styles.icon} src={arrowUpIcon} alt="" width={18} height={18} />
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
