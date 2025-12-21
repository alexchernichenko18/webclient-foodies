import { useState } from "react";
import classNames from "classnames";
import styles from "./Select.module.scss";

import { ReactComponent as IconChevronDown } from "../../../assets/icons/icon-chevron-down.svg";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  name?: string;
  placeholder?: string;
  options: Option[];
  error?: string;
  className?: string;
}

const Select = ({
  value,
  onChange,
  onBlur,
  name,
  placeholder,
  options,
  error,
  className,
}: SelectProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const wrapperClassName = classNames(styles.wrap, className, {
    [styles.error]: Boolean(error),
  });

  const hasValue = value !== "";
  const isPlaceholderShown = !hasValue;

  return (
    <div className={wrapperClassName}>
      <div className={styles.field}>
        <select
          className={classNames(styles.select, {
            [styles.placeholder]: isPlaceholderShown,
          })}
          value={value}
          name={name}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            if (onBlur) onBlur(e);
          }}
        >
          {placeholder && !hasValue && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className={classNames(styles.icon, { [styles.rotate]: isFocused })}>
          <IconChevronDown />
        </span>
      </div>

      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};

export default Select;