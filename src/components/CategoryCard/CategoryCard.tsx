import { ReactComponent as ArrowIcon } from "../../assets/icons/icon-arrow-up.svg";
import styles from "./CategoryCard.module.scss";
import type { Category } from "../../types/category";

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  imageUrl?: string;
}

const CategoryCard = ({ category, onClick, imageUrl }: CategoryCardProps) => {
  const backgroundImage = imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};

  return (
    <button type="button" className={styles.card} onClick={onClick} style={backgroundImage}>
      <div className={styles.overlay}>
        <span className={styles.name}>{category.name}</span>
        <ArrowIcon className={styles.icon} />
      </div>
    </button>
  );
};

export default CategoryCard;
