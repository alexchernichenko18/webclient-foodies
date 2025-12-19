import { useDispatch, useSelector } from "react-redux";
import Button from "../ui/Button";
import styles from "./HeroSection.module.scss";
import { RootState } from "../../store";
import { openSignInModal } from "../../store/slices/modalSlice";

const HeroSection = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const onAddRecipeClickHandler = () => {
    if (!isAuthenticated) {
      dispatch(openSignInModal());
    }
  }

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

          <Button onClick={onAddRecipeClickHandler} href={isAuthenticated ? "/add-recipe" : undefined} variant="outlined-dark" size="large">
            ADD RECIPE
          </Button>
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