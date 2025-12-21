import styles from "./MyProfile.module.scss";
import UserInfo from "../../components/UserInfo/UserInfo";
import TabContent from "./components/TabContent";

const MyProfile = () => {
  return (
    <section className={`f-container ${styles.page}`}>
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
          <TabContent />
        </main>
      </div>
    </section>
  );
};

export default MyProfile;
