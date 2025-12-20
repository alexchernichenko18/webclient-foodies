import { useEffect, useMemo, useRef, useState } from "react";
import { type Recipe } from "../../../api/recipes";
import styles from "./RecipeFilters.module.scss";

export interface RecipeFiltersProps {
  recipes: Recipe[];
  changeHandler: (selectedId: string, filterType: "ingredients" | "areas") => void;
}

const IngredientsFilters = ({
  recipes,
  value,
  changeHandler,
}: {
  recipes: Recipe[];
  value: string;
  changeHandler: (selectedId: string) => void;
}) => {
  const ingredientOptions = useMemo(() => {
    const ingredientsMap = new Map<string, string>();

    recipes.forEach((recipe) => {
      recipe.ingredients?.forEach((ingredient) => {
        if (!ingredientsMap.has(ingredient.id)) {
          ingredientsMap.set(ingredient.id, ingredient.name);
        }
      });
    });

    return Array.from(ingredientsMap.entries())
      .map(([id, name]) => ({ value: id, label: name }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [recipes]);

  return (
    <div className={styles.filterGroup}>
      <select
        className={styles.filterSelect}
        value={value}
        onChange={(e) => changeHandler(e.target.value)}
      >
        <option value="">Ingredients</option>
        {ingredientOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const AreaFilters = ({
  recipes,
  value,
  changeHandler,
}: {
  recipes: Recipe[];
  value: string;
  changeHandler: (selectedId: string) => void;
}) => {
  const areaOptions = useMemo(() => {
    const areasMap = new Map<string, string>();

    recipes.forEach((recipe) => {
      if (recipe.area && !areasMap.has(recipe.area.id)) {
        areasMap.set(recipe.area.id, recipe.area.name);
      }
    });

    return Array.from(areasMap.entries())
      .map(([id, name]) => ({ value: id, label: name }))
      .sort((a, b) => a.label.localeCompare(b.label));
  }, [recipes]);

  return (
    <div className={styles.filterGroup}>
      <select
        className={styles.filterSelect}
        value={value}
        onChange={(e) => changeHandler(e.target.value)}
      >
        <option value="">Area</option>
        {areaOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const RecipeFilters = ({ recipes, changeHandler }: RecipeFiltersProps) => {
  const [selectedIngredientId, setSelectedIngredientId] = useState("");
  const [selectedAreaId, setSelectedAreaId] = useState("");

  const baseRecipesRef = useRef<Recipe[] | null>(null);

  useEffect(() => {
    if (!baseRecipesRef.current && recipes.length > 0) {
      baseRecipesRef.current = recipes;
    }
  }, [recipes]);

  const optionsSourceRecipes = baseRecipesRef.current ?? recipes;

  const handleSelectChangeIngredient = (selectedId: string) => {
    setSelectedIngredientId(selectedId);
    changeHandler(selectedId, "ingredients");
  };

  const handleSelectChangeArea = (selectedId: string) => {
    setSelectedAreaId(selectedId);
    changeHandler(selectedId, "areas");
  };

  return (
    <div className={styles.filtersWrapper}>
      <IngredientsFilters
        recipes={optionsSourceRecipes}
        value={selectedIngredientId}
        changeHandler={handleSelectChangeIngredient}
      />
      <AreaFilters
        recipes={optionsSourceRecipes}
        value={selectedAreaId}
        changeHandler={handleSelectChangeArea}
      />
    </div>
  );
};

export default RecipeFilters;