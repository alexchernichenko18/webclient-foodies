import { useEffect, useMemo, useState } from "react";
import styles from "./TabContent.module.scss";
import TabMenu, { type TabMenuItem } from "../../../../components/ui/TabMenu";

import { profileApi } from "../../../../api/profileApi";
import type { User } from "../../../../api/userApi";
import type { Recipe } from "../../../../api/recipes";

import UserMiniCard from "../../../../components/UserMiniCard";
import RecipeMiniCard from "../../../../components/RecipeMiniCard";

type ProfileTab = "recipes" | "favorites" | "followers" | "following";

type Props =
  | { mode: "my" }
  | { mode: "user"; userId: string };

const TabContent = (props: Props) => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("recipes");

  const [followers, setFollowers] = useState<User[]>([]);
  const [following, setFollowing] = useState<User[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [favorites, setFavorites] = useState<Recipe[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const menuItems: TabMenuItem<ProfileTab>[] = useMemo(() => {
    const base: TabMenuItem<ProfileTab>[] = [
      { id: "recipes", label: props.mode === "my" ? "MY RECIPES" : "RECIPES" },
      { id: "followers", label: "FOLLOWERS" },
    ];

    if (props.mode === "my") {
      base.splice(1, 0, { id: "favorites", label: "MY FAVORITES" });
      base.push({ id: "following", label: "FOLLOWING" });
    }

    return base;
  }, [props.mode]);

  useEffect(() => {
    const allowed = new Set(menuItems.map((m) => m.id));
    if (!allowed.has(activeTab)) setActiveTab(menuItems[0].id);
  }, [menuItems, activeTab]);

  const emptyMessage = useMemo<Record<ProfileTab, string>>(
    () => ({
      recipes: props.mode === "my"
        ? "Nothing has been added to your recipes list yet. Please add your first recipe."
        : "No recipes yet.",
      favorites: "Nothing has been added to your favorite recipes list yet.",
      followers: props.mode === "my"
        ? "There are currently no followers on your account."
        : "This user has no followers yet.",
      following: "Your account currently has no subscriptions to other users.",
    }),
    [props.mode],
  );

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);

        if (props.mode === "my") {
          switch (activeTab) {
            case "recipes": {
              const list = await profileApi.getMyRecipes();
              if (isActive) setRecipes(list);
              return;
            }
            case "favorites": {
              const list = await profileApi.getMyFavorites();
              if (isActive) setFavorites(list);
              return;
            }
            case "followers": {
              const list = await profileApi.getMyFollowers();
              if (isActive) setFollowers(list);
              return;
            }
            case "following": {
              const list = await profileApi.getMyFollowing();
              if (isActive) setFollowing(list);
              return;
            }
          }
        }

        const userId = props.userId;

        switch (activeTab) {
          case "recipes": {
            const list = await profileApi.getUserRecipes(userId);
            if (isActive) setRecipes(list);
            return;
          }
          case "followers": {
            const list = await profileApi.getUserFollowers(userId);
            if (isActive) setFollowers(list);
            return;
          }
          default:
            return;
        }
      } catch (e: unknown) {
        if (!isActive) return;
        const message = e instanceof Error ? e.message : "Failed to load data";
        setError(message);
      } finally {
        if (!isActive) return;
        setLoading(false);
      }
    };

    void load();

    return () => {
      isActive = false;
    };
  }, [activeTab, props]);

  const renderUsers = (list: User[]) => (
    <div className={styles.usersList}>
      {list.map((u) => (
        // @ts-ignore
        <UserMiniCard key={u.id} user={u} />
      ))}
    </div>
  );

  const renderRecipes = (list: Recipe[]) => (
    <div className={styles.recipesList}>
      {list.map((r) => (
        // @ts-ignore
        <RecipeMiniCard key={r.id} recipe={r} />
      ))}
    </div>
  );

  const renderContent = () => {
    if (loading) return <p className={styles.message}>Loading...</p>;
    if (error) return <p className={styles.message}>{error}</p>;

    switch (activeTab) {
      case "recipes":
        return recipes.length ? renderRecipes(recipes) : <p className={styles.message}>{emptyMessage.recipes}</p>;

      case "favorites":
        return favorites.length ? renderRecipes(favorites) : <p className={styles.message}>{emptyMessage.favorites}</p>;

      case "followers":
        return followers.length ? renderUsers(followers) : <p className={styles.message}>{emptyMessage.followers}</p>;

      case "following":
        return following.length ? renderUsers(following) : <p className={styles.message}>{emptyMessage.following}</p>;

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <TabMenu<ProfileTab> menuItems={menuItems} activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default TabContent;
