import styles from "./MyProfile.module.scss";
import UserInfo from "../../components/UserInfo/UserInfo";
import TabContent from "./components/TabContent";
import Breadcrumbs from "../../components/Breadcrumbs";

const MyProfile = () => {
  return (
    <section className={`f-container ${styles.page}`}>
      <Breadcrumbs
        items={[
          { label: "Home", to: "/" },
          { label: "Profile" },
        ]}
      />

      <header className={styles.header}>
        <h1>PROFILE</h1>

        <p className={styles.subtitle}>
          Reveal your culinary art, share your favorite recipe and create
          gastronomic masterpieces with us.
        </p>
      </header>

      <div className={styles.layout}>
        <UserInfo />

        <main className={styles.main}>
          <TabContent mode="my" />
        </main>
      </div>
    </section>
  );
};

export default MyProfile;