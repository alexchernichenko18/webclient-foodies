import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import Button from "../ui/Button";
import styles from "./Header.module.scss";
import { ReactComponent as IconChevronDown } from "../../assets/icons/icon-chevron-down.svg";
import { ReactComponent as IconArrowUp } from "../../assets/icons/icon-arrow-up.svg";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { openLogOutModal, openSignInModal, openSignUpModal } from "../../store/slices/modalSlice";

type HeaderVariant = "dark" | "light";

interface HeaderProps {
  variant?: HeaderVariant;
}

const Header = ({ variant = "dark" }: HeaderProps) => {
  const isDark = variant === "dark";
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!isProfileOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (!profileRef.current) return;
      if (!profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileOpen]);

  const headerClassName = classNames(styles.header, {
    [styles.dark]: isDark,
    [styles.light]: !isDark,
  });

  const onSignInClickHandler = () => {
    dispatch(openSignInModal());
  }

  const onSignUpClickHandler = () => {
    dispatch(openSignUpModal());
  }

  const onLogoutHandler = () => {
    dispatch(openLogOutModal());
  }

  const onAddRecipeClickHandler = () => {
    if (!isAuthenticated) {
      dispatch(openSignInModal());
    }
  }

  let avatar;
  if (user) {
    avatar = user?.avatar ?
      <img
        src={process.env.REACT_APP_BASE_URL_API! + user?.avatar}
        alt="Avatar"
        className={styles.avatar}
      /> : <div className={styles.defaultAvatar}>{user?.name?.charAt(0)}</div>
  }

  return (
    <header className={headerClassName}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          foodies
        </Link>

        <nav className={styles.nav}>
          <Button href="/" variant={isDark ? "outlined-dark" : "light"} size="small">
            HOME
          </Button>
          <Button onClick={onAddRecipeClickHandler} href={isAuthenticated ? "/add-recipe" : undefined} variant={isDark ? "dark" : "outlined-light"} size="small">
            ADD RECIPE
          </Button>
        </nav>

        <div className={styles.right}>
          {!isAuthenticated ? (
            <div className={styles.authToggle}>
              <Button variant="light" size="small" className={styles.signInButton} onClick={onSignInClickHandler}>
                SIGN IN
              </Button>
              <Button variant="outlined-dark" size="small" className={styles.signUpButton} onClick={onSignUpClickHandler}>
                SIGN UP
              </Button>
            </div>
          ) : (
            <div className={styles.profileWrap} ref={profileRef}>
              <button
                type="button"
                className={styles.profile}
                onClick={() => setIsProfileOpen(prev => !prev)}
              >
                <div className={styles.avatar}>{avatar}</div>
                <span className={styles.name}>{user?.name}</span>
                <span className={styles.chevron}>
                  <IconChevronDown />
                </span>
              </button>

              {isProfileOpen && (
                <div className={styles.profileMenu}>
                  <Link to="/profile" className={styles.profileMenuItem}>
                    PROFILE
                  </Link>
                  <button type="button" className={styles.profileMenuItem} onClick={onLogoutHandler}>
                    LOG OUT
                    <IconArrowUp />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;