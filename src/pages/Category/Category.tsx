import { useParams } from 'react-router-dom';
import styles from './Category.module.scss';

const Category = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles.wrap}>
      Category Page: {id}
    </div>
  );
}

export default Category;