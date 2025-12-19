import styles from './AddRecipe.module.scss';
import AddRecipeForm from '../../components/AddRecipeForm';

const AddRecipe = () => {
  return (
    <div className={styles.wrap}>
      <h1>Add Recipe</h1>
      <AddRecipeForm />
    </div>
  );
}

export default AddRecipe;