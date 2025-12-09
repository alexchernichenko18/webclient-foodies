import { useParams } from 'react-router-dom';
import styles from './Profile.module.scss';

const Profile = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className={styles.wrap}>
      Profile Page: {id}
    </div>
  );
}

export default Profile;