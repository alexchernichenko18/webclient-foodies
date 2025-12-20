import { useEffect, useState } from "react";
import noImage from "../../assets/recipes/no-image.png";

interface IAvatarProps {
  src?: string | null;
  alt?: string;
  className?: string;
}

const Image = ({ src, alt = "Recipe Image", className }: IAvatarProps) => {
  const [imgSrc, setImgSrc] = useState(noImage);

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

    setImgSrc(noImage);
  }, [src]);

  return <img src={imgSrc || noImage} alt={alt} className={className} onError={() => setImgSrc(noImage)} />;
};

export default Image;
