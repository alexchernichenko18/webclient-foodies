import { ReactComponent as ArrowIcon } from "../../assets/icons/icon-arrow-up.svg";
import styles from "./CategoryCard.module.scss";
import type { Category } from "../../types/category";
import type { CategoryCardImageSourceSet } from "../../utils/categoryImages";

interface CategoryCardProps {
  category: Category;
  onArrowClick: () => void;
  image?: CategoryCardImageSourceSet;
  size?: "small" | "large-tablet" | "large-desktop";
}

const CategoryCard = ({ category, onArrowClick, image, size }: CategoryCardProps) => {
  const dataSize = size ? { "data-size": size } : {};

  return (
    <div className={styles.card} {...dataSize}>
      {image ? <img className={styles.image} src={image.src} srcSet={image.srcSet} alt={category.name} loading="lazy" decoding="async" /> : null}

      <div className={styles.overlay}>
        <div className={styles.badge}>
          <span className={styles.name}>{category.name}</span>
          <button type="button" className={styles.action} onClick={onArrowClick} aria-label={`Відкрити рецепти: ${category.name}`}>
            <ArrowIcon className={styles.icon} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;