import { useParams } from 'react-router-dom';
import styles from './Recipe.module.scss';

const Recipe = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles.wrap}>
      Recipe Page: {id}
    </div>
  );
}

export default Recipe;