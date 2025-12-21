import Image from "../Image";
import styles from "./UserMiniCard.module.scss";

export interface UserMiniCardProps {
  id: string;
  name: string;
  avatar?: string;
  isFollowing?: boolean;
  onFollow?: (id: string) => void;
  onUnfollow?: (id: string) => void;
}

const UserMiniCard = ({
  id,
  name,
  avatar,
  isFollowing = false,
  onFollow,
  onUnfollow,
}: UserMiniCardProps) => {
  return (
    <div className={styles.card}>
      <Image
        className={styles.avatar}
        src={avatar || "/images/avatar-placeholder.png"}
        alt={name}
      />

      <span className={styles.name}>{name}</span>

      {isFollowing ? (
        <button
          type="button"
          className={styles.following}
          onClick={() => onUnfollow?.(id)}
        >
          Following
        </button>
      ) : (
        <button
          type="button"
          className={styles.follow}
          onClick={() => onFollow?.(id)}
        >
          Follow
        </button>
      )}
    </div>
  );
};

export default UserMiniCard;
