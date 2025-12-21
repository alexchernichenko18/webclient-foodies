import { useEffect, useState } from "react";
import styles from "./Avatar.module.scss";
import noAvatar from "../../assets/recipes/no-avatar.jpg";

interface IAvatarProps {
  src?: string | null;
  alt?: string;
}

const Avatar = ({ src, alt = "Avatar" }: IAvatarProps) => {
  const [imgSrc, setImgSrc] = useState(noAvatar);

  useEffect(() => {
    if (src) {
      if (src.startsWith("http")) {
        setImgSrc(src);
      } else {
        const baseURL = process.env.REACT_APP_BASE_URL_API || "";
        setImgSrc(baseURL ? `${baseURL}${src}` : src);
      }
      return;
    }

    setImgSrc(noAvatar);
  }, [src]);

  return <img src={imgSrc || noAvatar} alt={alt} className={styles.avatar} onError={() => setImgSrc(noAvatar)} />;
};

export default Avatar;
