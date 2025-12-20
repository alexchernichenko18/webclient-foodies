import { useState } from "react";
import styles from "./Avatar.module.scss";
import noAvatar from "../../assets/recipes/no-avatar.jpg";

interface IAvatarProps {
  src?: string | null;
  alt?: string;
}

const Avatar = ({ src, alt = "Avatar" }: IAvatarProps) => {
  const [imgSrc, setImgSrc] = useState(src ?? noAvatar);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={styles.avatar}
      onError={() => setImgSrc(noAvatar)}
    />
  );
};

export default Avatar;