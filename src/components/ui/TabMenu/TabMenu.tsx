import styles from "./TabMenu.module.scss";

export type TabMenuItem<T extends string> = {
  id: T;
  label: string;
};

type TabMenuProps<T extends string> = {
  menuItems: TabMenuItem<T>[];
  activeTab: T;
  setActiveTab: (id: T) => void;
};

const TabMenu = <T extends string>({
  menuItems,
  activeTab,
  setActiveTab,
}: TabMenuProps<T>) => {
  return (
    <div className={styles.menuContainer}>
      {menuItems.map((item) => (
        <div
          key={item.id}
          className={`${styles.menuItem} ${
            item.id === activeTab ? styles.active : ""
          }`}
          onClick={() => setActiveTab(item.id)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setActiveTab(item.id);
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default TabMenu;
