import { useEffect, useMemo, useRef, useState } from "react";
import classNames from "classnames";
import styles from "./Select.module.scss";

import { ReactComponent as IconChevronDown } from "../../../assets/icons/icon-chevron-down.svg";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  value: string;
  onChange: (event: { target: { value: string; name?: string } }) => void;
  onBlur?: () => void;
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
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const selectedOption = useMemo(
    () => options.find((o) => o.value === value),
    [options, value]
  );

  useEffect(() => {
    const handlePointerDown = (e: PointerEvent) => {
      if (!isOpen) return;
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        if (onBlur) onBlur();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [isOpen, onBlur]);

  return (
    <div
      ref={wrapperRef}
      className={classNames(styles.wrap, className, {
        [styles.error]: Boolean(error),
      })}
    >
      <div className={styles.field}>
        <button
          ref={triggerRef}
          type="button"
          className={styles.trigger}
          onClick={() => setIsOpen((p) => !p)}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <span
            className={classNames(styles.value, {
              [styles.placeholder]: !selectedOption,
            })}
          >
            {selectedOption?.label || placeholder}
          </span>

          <span className={classNames(styles.icon, { [styles.rotate]: isOpen })}>
            <IconChevronDown />
          </span>
        </button>

        {isOpen && (
          <div className={styles.dropdown} role="listbox">
            <div className={styles.options}>
              {options.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={option.value === value}
                  className={classNames(styles.option, {
                    [styles.selected]: option.value === value,
                  })}
                  onClick={() => {
                    onChange({ target: { value: option.value, name } });
                    setIsOpen(false);
                    triggerRef.current?.focus();
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {error && <div className={styles.errorText}>{error}</div>}
    </div>
  );
};

export default Select;