import { Link } from "react-router-dom";
import styles from "./MobileMenu.module.scss";
import { ReactComponent as CloseIcon } from "../../assets/icons/icon-close.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { openSignInModal } from "../../store/slices/modalSlice";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu = ({ isOpen, onClose }: MobileMenuProps) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const onAddRecipeClickHandler = () => {
    if (!isAuthenticated) {
      dispatch(openSignInModal());
    }
  }

  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.menu}>
        {/* HEADER */}
        <div className={styles.top}>
          <span className={styles.logo}>foodies</span>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {/* CENTER */}
        <div className={styles.center}>
          <Link to="/" onClick={onClose} className={styles.homeButton}>
            HOME
          </Link>
          <Link to="/add-recipe" onClick={() => {
            onAddRecipeClickHandler();
            onClose();
          }} className={styles.addLink}>
            ADD RECIPE
          </Link>
        </div>

        {/* BOTTOM */}
        <div className={styles.bottom}>
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
    </div>
  );
};

export default MobileMenu;