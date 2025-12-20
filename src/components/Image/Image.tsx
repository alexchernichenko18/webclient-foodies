import { useEffect, useState } from "react";
import noImage from "../../assets/recipes/no-image.png";

interface IAvatarProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

const Image = ({ src, alt = "Recipe Image", className }: IAvatarProps) => {
  const [imgSrc, setImgSrc] = useState('');

  useEffect(() => {
    if (src) {
      if (src.startsWith("http")) {
        setImgSrc(src);
      } else {
        setImgSrc(`${process.env.REACT_APP_BASE_URL_API}${src}`);
      }
      return;
    }

    setImgSrc(noImage);
  }, [src]);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(noImage)}
    />
  );
};

export default Image;