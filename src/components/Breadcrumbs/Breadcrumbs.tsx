import { Link } from "react-router-dom";
import styles from "./Breadcrumbs.module.scss";

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

type Props = {
  items: BreadcrumbItem[];
  className?: string;
};

const Breadcrumbs = ({ items, className }: Props) => {
  return (
    <nav className={`${styles.breadcrumbs} ${className ?? ""}`} aria-label="Breadcrumb">
      <ol className={styles.list}>
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;

          return (
            <li key={`${item.label}-${idx}`} className={styles.item}>
              {item.to && !isLast ? (
                <Link className={styles.link} to={item.to}>
                  {item.label}
                </Link>
              ) : (
                <span className={styles.current} aria-current={isLast ? "page" : undefined}>
                  {item.label}
                </span>
              )}

              {!isLast && <span className={styles.sep}>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
