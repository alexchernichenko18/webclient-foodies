import styles from "./MainTitle.module.scss";

interface MainTitleProps {
  children: React.ReactNode;
  className?: string;
}

const MainTitle = ({ children, className = "" }: MainTitleProps) => {
  return <h1 className={`${styles.title} ${className}`}>{children}</h1>;
};

export default MainTitle;
