import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import Button from "../ui/Button";

import styles from "./Header.module.scss";

import { ReactComponent as IconChevronDown } from "../../assets/icons/icon-chevron-down.svg";
import { ReactComponent as IconArrowUp } from "../../assets/icons/icon-arrow-up.svg";

type HeaderVariant = "dark" | "light";

interface HeaderProps {
  variant?: HeaderVariant;
  isAuthenticated: boolean;
}

const Header = ({ variant = "dark", isAuthenticated }: HeaderProps) => {
  const isDark = variant === "dark";
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);

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
          <Button href="/add-recipe" variant={isDark ? "dark" : "outlined-light"} size="small">
            ADD RECIPE
          </Button>
        </nav>

        <div className={styles.right}>
          {!isAuthenticated ? (
            <div className={styles.authToggle}>
              <Button variant="light" size="small" className={styles.signInButton}>
                SIGN IN
              </Button>
              <Button variant="outlined-dark" size="small" className={styles.signUpButton}>
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
                <div className={styles.avatar}>V</div>
                <span className={styles.name}>VICTORIA</span>
                <span className={styles.chevron}>
                  <IconChevronDown />
                </span>
              </button>

              {isProfileOpen && (
                <div className={styles.profileMenu}>
                  <Link to="/profile" className={styles.profileMenuItem}>
                    PROFILE
                  </Link>
                  <button type="button" className={styles.profileMenuItem}>
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