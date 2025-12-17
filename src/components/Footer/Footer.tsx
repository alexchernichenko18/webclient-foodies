import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

import { ReactComponent as IconFacebook } from "../../assets/icons/icon-facebook.svg";
import { ReactComponent as IconInstagram } from "../../assets/icons/icon-instagram.svg";
import { ReactComponent as IconYoutube } from "../../assets/icons/icon-youtube.svg";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <Link to="/" className={styles.logo}>
          foodies
        </Link>

        <ul className={styles.socials}>
          <li>
            <a
              href="https://www.facebook.com/goITclub/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GoIT Facebook"
              className={styles.socialLink}
            >
              <IconFacebook />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/goitclub/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GoIT Instagram"
              className={styles.socialLink}
            >
              <IconInstagram />
            </a>
          </li>
          <li>
            <a
              href="https://www.youtube.com/c/GoIT"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GoIT YouTube"
              className={styles.socialLink}
            >
              <IconYoutube />
            </a>
          </li>
        </ul>
      </div>

      <div className={styles.divider} />

      <p className={styles.copy}>©2024, Foodies. All rights reserved</p>
    </footer>
  );
};

export default Footer;