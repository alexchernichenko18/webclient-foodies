import { NavLink } from "react-router-dom";
import cx from "classnames";
import styles from "./Button.module.scss";

type ButtonVariant = "light" | "dark" | "outlined-light" | "outlined-dark";
type ButtonSize = "small" | "large";

interface ButtonProps {
  children?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  expanded?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
}

const Button = ({
  children,
  type = "button",
  className = "",
  icon,
  variant = "light",
  size = "large",
  href,
  expanded = false,
  disabled,
  onClick,
}: ButtonProps) => {
  const classes = cx(
    styles.btn,
    styles[variant],
    styles[size],
    {
      [styles.expanded]: expanded,
      [styles.btnIcon]: !!icon,
      [styles.disabled]: disabled,
    },
    className,
  );

  const onClickHanlder = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  }

  if (href) {
    return (
      // @ts-ignore
      <NavLink to={href} className={classes} onClick={onClickHanlder}>
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </NavLink>
    );
  }

  return (
    <button type={type} onClick={onClickHanlder} className={classes}>
      {icon && <span className={styles.icon}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;