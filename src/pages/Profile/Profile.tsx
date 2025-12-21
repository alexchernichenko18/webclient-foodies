import { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./Profile.module.scss";
import userInfoStyles from "../../components/UserInfo/UserInfo.module.scss";
import Button from "../../components/ui/Button/Button";
import Avatar from "../../components/Avatar";
import Breadcrumbs from "../../components/Breadcrumbs";
import { userApi, type User } from "../../api/userApi";
import { profileApi } from "../../api/profileApi";
import TabContent from "../MyProfile/components/TabContent";

const Profile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const userId = useMemo(() => id?.trim() ?? "", [id]);

  const [user, setUser] = useState<User | null>(null);
  const [loadingUser, setLoadingUser] = useState(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isFollowLoading, setIsFollowLoading] = useState(false);

  useEffect(() => {
    if (!userId) return;

    let isActive = true;

    const loadProfile = async () => {
      try {
        setLoadingUser(true);
        setUserError(null);

        const [currentRes, profileRes, followingList] = await Promise.all([
          userApi.getCurrentUserInfo(),
          userApi.getUserById(userId),
          profileApi.getMyFollowing(),
        ]);

        if (!isActive) return;

        if (currentRes.data.id === userId) {
          navigate("/profile", { replace: true });
          return;
        }

        setUser(profileRes.data);
        setIsFollowing(followingList.some((u) => u.id === userId));
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

  const handleFollowToggle = useCallback(async () => {
    if (!user || isFollowLoading) return;

    setIsFollowLoading(true);
    try {
      if (isFollowing) {
        await profileApi.unfollowUser(user.id);
        setIsFollowing(false);
        setUser((prev) =>
          prev ? { ...prev, followersAmount: Math.max(0, (prev.followersAmount ?? 1) - 1) } : prev
        );
      } else {
        await profileApi.followUser(user.id);
        setIsFollowing(true);
        setUser((prev) =>
          prev ? { ...prev, followersAmount: (prev.followersAmount ?? 0) + 1 } : prev
        );
      }
    } catch (e) {
      console.error("Failed to toggle follow:", e);
    } finally {
      setIsFollowLoading(false);
    }
  }, [user, isFollowing, isFollowLoading]);

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
                    {user.recipesAmount ?? 0}
                  </span>
                </p>
              </li>

              <li>
                <p className={userInfoStyles.textProfile}>
                  Favorites:
                  <span className={userInfoStyles.textValueProfile}>
                    {user.favoriteRecipesAmount ?? 0}
                  </span>
                </p>
              </li>

              <li>
                <p className={userInfoStyles.textProfile}>
                  Followers:
                  <span className={userInfoStyles.textValueProfile}>
                    {user.followersAmount ?? 0}
                  </span>
                </p>
              </li>

              <li>
                <p className={userInfoStyles.textProfile}>
                  Following:
                  <span className={userInfoStyles.textValueProfile}>
                    {user.followingsAmount ?? 0}
                  </span>
                </p>
              </li>
            </ul>
          </div>

          <Button
            variant={isFollowing ? "outlined-dark" : "dark"}
            expanded
            onClick={handleFollowToggle}
            disabled={isFollowLoading}
          >
            {isFollowLoading ? "..." : isFollowing ? "UNFOLLOW" : "FOLLOW"}
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
