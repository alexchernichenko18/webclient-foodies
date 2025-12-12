import { ReactComponent as ArrowIcon } from "../../assets/icons/icon-arrow-up.svg";
import styles from "./CategoryCard.module.scss";
import type { Category } from "../../types/category";

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
  imageUrl?: string;
  size?: "small" | "large-tablet" | "large-desktop";
}

const CategoryCard = ({ category, onClick, imageUrl, size }: CategoryCardProps) => {
  const backgroundImage = imageUrl ? { backgroundImage: `url(${imageUrl})` } : {};
  const dataSize = size ? { "data-size": size } : {};

  return (
    <button type="button" className={styles.card} onClick={onClick} style={backgroundImage} {...dataSize}>
      <div className={styles.overlay}>
        <span className={styles.name}>{category.name}</span>
        <ArrowIcon className={styles.icon} />
      </div>
    </button>
  );
};

export default CategoryCard;
