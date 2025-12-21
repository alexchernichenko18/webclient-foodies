import styles from "./AddRecipe.module.scss";
import AddRecipeForm from "../../components/AddRecipeForm";
import Breadcrumbs from "../../components/Breadcrumbs";

const AddRecipe = () => {
  return (
    <div className={styles.wrap}>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Add recipe" },
        ]}
      />

      <h1 className={styles.title}>Add Recipe</h1>
      <h2 className={styles.subtitle}>
        Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
      </h2>

      <AddRecipeForm />
    </div>
  );
};

export default AddRecipe;