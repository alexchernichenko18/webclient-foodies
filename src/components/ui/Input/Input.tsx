import { useState } from "react";
import classNames from "classnames";

import styles from "./Input.module.scss";

import { ReactComponent as IconEye } from "../../../assets/icons/icon-eye.svg";
import { ReactComponent as IconEyeOff } from "../../../assets/icons/icon-eye-off.svg";

type InputType = "text" | "password";

interface InputProps {
  type?: InputType;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  placeholder?: string;
  error?: string;
  className?: string;
}

const Input = ({
  type = "text",
  value,
  onChange,
  name,
  placeholder,
  error,
  className,
}: InputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === "password";
  const inputType = isPassword ? (isPasswordVisible ? "text" : "password") : "text";

  const wrapperClassName = classNames(styles.wrap, className, {
    [styles.error]: Boolean(error),
  });

  return (
    <div className={wrapperClassName}>
      <div className={styles.field}>
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          name={name}
          placeholder={placeholder}
          className={styles.input}
        />

        {isPassword && (
          <button
            type="button"
            className={styles.eyeButton}
            onClick={() => setIsPasswordVisible(prev => !prev)}
          >
            {isPasswordVisible ? (
              <IconEye className={styles.icon} />
            ) : (
              <IconEyeOff className={styles.icon} />
            )}
          </button>
        )}
      </div>

      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};

export default Input;
