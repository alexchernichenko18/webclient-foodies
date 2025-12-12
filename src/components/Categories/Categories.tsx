import MainTitle from "../ui/MainTitle";
import Subtitle from "../ui/Subtitle";
import CategoryList from "../CategoryList";
import styles from "./Categories.module.scss";

interface CategoriesProps {
  onCategoryClick: (categoryId: string | null) => void;
}

const Categories = ({ onCategoryClick }: CategoriesProps) => {
  return (
    <section className={styles.categories}>
      <MainTitle>CATEGORIES</MainTitle>
      <Subtitle>Discover a limitless world of culinary possibilities and enjoy exquisite recipes that combine taste, style and the warm atmosphere of the kitchen.</Subtitle>
      <CategoryList onCategoryClick={onCategoryClick} />
    </section>
  );
};

export default Categories;
