import { useDispatch, useSelector } from 'react-redux';
import styles from './UserInfo.module.scss';
import Plus from '../../assets/icons/icon-plus.svg';
import { selectUserInfo } from "../../store/user/slice";
import { logoutThunk } from "../../store/slices/authSlice";
import { getCurrentUser, uploadAvatar } from "../../store/user/operations";
import { ChangeEvent, useEffect } from "react";
import Avatar from '../Avatar';

interface User {
  name: string;
  avatar: string | null;
  email: string;
  recipesAmount: number;
  favoriteRecipesAmount: number;
  followersAmount: number;
  followingsAmount: number;
  isSubscribed: boolean;
}

export default function UserInfo() {
  const dispatch = useDispatch<any>();

  const user = useSelector(selectUserInfo) as User | null;
  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  const handleChangeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && files.length > 0) {
      const selectedFile = files[0];
      dispatch(uploadAvatar({ file: selectedFile }));
    }
  };

  const handleLogoutClickBtn = async () => {
    await (dispatch as any)(logoutThunk());
  }

  return (
    <div className={styles.profileWrapper}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatarContainer}>
            <div className={styles.avatarBox}>
              <Avatar src={user?.avatar ? process.env.REACT_APP_BASE_URL_API! + user.avatar : undefined} alt={user?.name ?? "User Avatar"} />
            </div>
            {
              <>
                <label htmlFor="fileInput" className={styles.uploadButton}>
                  <div className={styles.boxIcon}>
                    <img src={Plus} alt="Icon" width={16} />
                  </div>
                </label>

                <input
                  className={styles.input}
                  type="file"
                  id="fileInput"
                  onChange={handleChangeAvatar}
                />
              </>
            }
          </div>
          <p className={styles.name}>{user?.name}</p>
        </div>

        <ul className={styles.stats}>
          <li>
            <p className={styles.textProfile}>
              Email:<span className={styles.textValueProfile}>{user?.email}</span>
            </p>
          </li>
          <li>
            <p className={styles.textProfile}>
              Added Recipes:<span className={styles.textValueProfile}>{user?.recipesAmount}</span>
            </p>
          </li>
          {(
            <li>
              <p className={styles.textProfile}>
                Favorites:
                <span className={styles.textValueProfile}>{user?.favoriteRecipesAmount}</span>
              </p>
            </li>
          )}
          <li>
            <p className={styles.textProfile}>
              Followers:<span className={styles.textValueProfile}>{user?.followersAmount}</span>
            </p>
          </li>
          {(
            <li>
              <p className={styles.textProfile}>
                Following:<span className={styles.textValueProfile}>{user?.followingsAmount}</span>
              </p>
            </li>
          )}
        </ul>
      </div>
      <button className={styles.logout} type="button" onClick={handleLogoutClickBtn}>
        LOG OUT
      </button>
    </div>
  );
}