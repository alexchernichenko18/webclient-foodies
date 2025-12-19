import { useMemo } from "react";
import { type Recipe } from "../../../api/recipes";
import styles from "./RecipeFilters.module.scss";

export interface RecipeFiltersProps {
  recipes: Recipe[];
  changeHandler: (selectedId: string, filterType: "ingredients" | "areas") => void;
}

// IngredientsFilters
const IngredientsFilters = ({ 
  recipes,
  changeHandler 
}: { 
  recipes: Recipe[];
  changeHandler: (selectedId: string) => void 
}) => {
  // Витягуємо унікальні інгредієнти з усіх рецептів
  const ingredientOptions = useMemo(() => {
    const ingredientsMap = new Map<string, string>();
    
    recipes.forEach(recipe => {
      recipe.ingredients?.forEach(ingredient => {
        if (!ingredientsMap.has(ingredient.id)) {
          ingredientsMap.set(ingredient.id, ingredient.name);
        }
      });
    });

    return Array.from(ingredientsMap.entries()).map(([id, name]) => ({
      value: id,
      label: name,
    }));
  }, [recipes]);

  return (
    <div className={styles.filterGroup}>
      <select
        className={styles.filterSelect}
        onChange={(e) => changeHandler(e.target.value)}
        defaultValue=""
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

// AreaFilters
const AreaFilters = ({ 
  recipes,
  changeHandler 
}: { 
  recipes: Recipe[];
  changeHandler: (selectedId: string) => void 
}) => {
  // Витягуємо унікальні areas з усіх рецептів
  const areaOptions = useMemo(() => {
    const areasMap = new Map<string, string>();
    
    recipes.forEach(recipe => {
      if (recipe.area) {
        if (!areasMap.has(recipe.area.id)) {
          areasMap.set(recipe.area.id, recipe.area.name);
        }
      }
    });

    return Array.from(areasMap.entries()).map(([id, name]) => ({
      value: id,
      label: name,
    }));
  }, [recipes]);

  return (
    <div className={styles.filterGroup}>
      <select
        className={styles.filterSelect}
        onChange={(e) => changeHandler(e.target.value)}
        defaultValue=""
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

// Main RecipeFilters component
const RecipeFilters = ({ recipes, changeHandler }: RecipeFiltersProps) => {
  const handleSelectChangeIngredient = (selectedId: string) => {
    changeHandler(selectedId, "ingredients");
  };

  const handleSelectChangeArea = (selectedId: string) => {
    changeHandler(selectedId, "areas");
  };

  return (
    <div className={styles.filtersWrapper}>
      <IngredientsFilters 
        recipes={recipes}
        changeHandler={handleSelectChangeIngredient} 
      />
      <AreaFilters 
        recipes={recipes}
        changeHandler={handleSelectChangeArea} 
      />
    </div>
  );
};

export default RecipeFilters;