import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Profile.module.scss";
import userInfoStyles from "../../components/UserInfo/UserInfo.module.scss";
import Button from "../../components/ui/Button/Button";
import Avatar from "../../components/Avatar";
import Breadcrumbs from "../../components/Breadcrumbs";
import { userApi, type User } from "../../api/userApi";
import TabContent from "../MyProfile/components/TabContent";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = useMemo(() => id?.trim() ?? "", [id]);

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    let isActive = true;

    const loadProfile = async () => {
      try {
        setLoadingUser(true);
        setUserError(null);

        const [currentRes, profileRes] = await Promise.all([
          userApi.getCurrentUserInfo(),
          userApi.getUserById(userId),
        ]);

        if (!isActive) return;

        if (currentRes.data.id === userId) {
          navigate("/profile", { replace: true });
          return;
        }

        setUser(profileRes.data);
      } catch (e: unknown) {
        if (!isActive) return;
        const message = e instanceof Error ? e.message : "Failed to load user";
        setUserError(message);
        setUser(null);
      } finally {
        if (!isActive) return;
        setLoadingUser(false);
      }
    };

    void loadProfile();

    return () => {
      isActive = false;
    };
  }, [userId, navigate]);

  if (!userId || loadingUser || userError || !user) return null;

  return (
    <section className={`f-container ${styles.page}`}>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Profile", to: "/profile" },
          { label: user.name },
        ]}
      />

      <header className={styles.header}>
        <h1>USER PROFILE</h1>
        <p className={styles.subtitle}>
          Reveal your culinary art, share your favorite recipe and create gastronomic masterpieces with us.
        </p>
      </header>

      <div className={styles.layout}>
        <div className={userInfoStyles.profileWrapper}>
          <div className={userInfoStyles.card}>
            <div className={userInfoStyles.header}>
              <div className={userInfoStyles.avatarContainer}>
                <div className={userInfoStyles.avatarBox}>
                  <Avatar src={user.avatar ?? ""} alt={user.name ?? "User Avatar"} />
                </div>
              </div>
              <p className={userInfoStyles.name}>{user.name}</p>
            </div>

            <ul className={userInfoStyles.stats}>
              <li>
                <p className={userInfoStyles.textProfile}>
                  Email:
                  <span className={userInfoStyles.textValueProfile}>{user.email}</span>
                </p>
              </li>

              <li>
                <p className={userInfoStyles.textProfile}>
                  Added recipes:
                  <span className={userInfoStyles.textValueProfile}>
                    {(user as unknown as { recipesAmount?: number }).recipesAmount ?? 0}
                  </span>
                </p>
              </li>

              <li>
                <p className={userInfoStyles.textProfile}>
                  Favorites:
                  <span className={userInfoStyles.textValueProfile}>
                    {(user as unknown as { favoritesAmount?: number }).favoritesAmount ?? 0}
                  </span>
                </p>
              </li>

              <li>
                <p className={userInfoStyles.textProfile}>
                  Followers:
                  <span className={userInfoStyles.textValueProfile}>
                    {(user as unknown as { followersAmount?: number }).followersAmount ?? 0}
                  </span>
                </p>
              </li>

              <li>
                <p className={userInfoStyles.textProfile}>
                  Following:
                  <span className={userInfoStyles.textValueProfile}>
                    {(user as unknown as { followingAmount?: number }).followingAmount ?? 0}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <Button variant="dark" expanded onClick={() => console.log("Followed!")}>
            FOLLOW
          </Button>
        </div>

        <main className={styles.main}>
          <TabContent mode="user" userId={user.id} />
        </main>
      </div>
    </section>
  );
};

export default Profile;
