import Image from "../Image";
import styles from "./UserMiniCard.module.scss";
import { ReactComponent as IconArrowUp } from "../../assets/icons/icon-arrow-up.svg";
import Button from "../ui/Button";
import { Link } from "react-router-dom";

interface RecipePreview {
  id: string;
  thumb?: string;
  name: string;
}

export interface UserMiniCardProps {
  id: string;
  name: string;
  avatar?: string;
  recipesCount?: number;
  recipes?: RecipePreview[];
  isFollowing?: boolean;
  onFollow?: (id: string) => void;
  onUnfollow?: (id: string) => void;
}

const UserMiniCard = ({
  id,
  name,
  avatar,
  recipesCount = 0,
  recipes = [],
  isFollowing = false,
  onFollow,
  onUnfollow,
}: UserMiniCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.userInfo}>
        <Link to={`/profile/${id}`}>
          <Image
            className={styles.avatar}
            src={avatar || "/images/avatar-placeholder.png"}
            alt={name}
          />
        </Link>
        <div className={styles.details}>
          <span className={styles.name}>{name.toUpperCase()}</span>
          <span className={styles.recipesCount}>Own recipes: {recipesCount}</span>
          {isFollowing ? (
            <button
              type="button"
              className={styles.unfollowBtn}
              onClick={() => onUnfollow?.(id)}
            >
              UNFOLLOW
            </button>
          ) : (
            <button
              type="button"
              className={styles.followBtn}
              onClick={() => onFollow?.(id)}
            >
              FOLLOW
            </button>
          )}
        </div>
      </div>

      {recipes.length > 0 && (
        <div className={styles.recipePreviews}>
          {recipes.slice(0, 4).map((recipe) => (
            <Image
              key={recipe.id}
              className={styles.recipeThumb}
              src={recipe.thumb || "/images/recipe-placeholder.png"}
              alt={recipe.name}
            />
          ))}
        </div>
      )}

      <Button variant="light" icon={<IconArrowUp />} href={`/profile/${id}`} />
    </div>
  );
};

export default UserMiniCard;
