import styles from "./AllCategoriesCard.module.scss";

interface AllCategoriesCardProps {
  onClick: () => void;
}

const AllCategoriesCard = ({ onClick }: AllCategoriesCardProps) => {
  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <span className={styles.text}>ALL CATEGORIES</span>
    </button>
  );
};

export default AllCategoriesCard;
