import { useMemo, useState } from "react";
import styles from "./TabContent.module.scss";
import TabMenu, { TabMenuItem } from "../../../../components/ui/TabMenu";

type ProfileTab = "recipes" | "favorites" | "followers" | "following";

const TabContent = () => {
  const [activeTab, setActiveTab] = useState<ProfileTab>("recipes");

  const menuItems: TabMenuItem<ProfileTab>[] = useMemo(
    () => [
      { id: "recipes", label: "MY RECIPES" },
      { id: "favorites", label: "MY FAVORITES" },
      { id: "followers", label: "FOLLOWERS" },
      { id: "following", label: "FOLLOWING" },
    ],
    []
  );

  const emptyMessage = useMemo<Record<ProfileTab, string>>(
    () => ({
      recipes:
        "Nothing has been added to your recipes list yet. Please add your first recipe.",
      favorites:
        "Nothing has been added to your favorite recipes list yet. Please add your favorites for easy access.",
      followers:
        "There are currently no followers on your account. Create interesting content and draw attention to your profile.",
      following:
        "Your account currently has no subscriptions to other users. Explore creators and follow those you like.",
    }),
    []
  );

  const renderContent = () => {
    switch (activeTab) {
      case "recipes":
        return <p className={styles.message}>{emptyMessage.recipes}</p>;

      case "favorites":
        return <p className={styles.message}>{emptyMessage.favorites}</p>;

      case "followers":
        return <p className={styles.message}>{emptyMessage.followers}</p>;

      case "following":
        return <p className={styles.message}>{emptyMessage.following}</p>;

      default:
        return null;
    }
  };

  return (
    <div className={styles.container}>
      <TabMenu<ProfileTab>
        menuItems={menuItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className={styles.content}>{renderContent()}</div>
    </div>
  );
};

export default TabContent;
