import styles from "./Subtitle.module.scss";

interface SubtitleProps {
  children: React.ReactNode;
  className?: string;
}

const Subtitle = ({ children, className = "" }: SubtitleProps) => {
  return <p className={`${styles.subtitle} ${className}`}>{children}</p>;
};

export default Subtitle;
