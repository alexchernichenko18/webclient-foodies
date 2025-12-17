import styles from "./HeroSection.module.scss";

const HeroSection = () => {
  return (
    <section className={styles.wrap}>
      <div className={styles.inner}>

        {/* content */}
        <div className={styles.content}>
          <h1 className={styles.title}>
            IMPROVE YOUR <br />
            CULINARY TALENTS
          </h1>

          <p className={styles.text}>
            Amazing recipes for beginners in the world of cooking, enveloping
            you in the aromas and tastes of various cuisines.
          </p>

          <button className={styles.button}>ADD RECIPE</button>
        </div>

        {/* images */}
        <div className={styles.images}>
          <img
            src="/images/hero-small-image.png"
            alt="Dessert"
            className={styles.imageSmall}
          />
          <img
            src="/images/hero-large-image.png"
            alt="Beef"
            className={styles.imageLarge}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;