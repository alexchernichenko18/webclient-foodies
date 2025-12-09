import { useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./TextArea.module.scss";

interface TextAreaProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  placeholder?: string;
  error?: boolean;
  maxLength?: number;
  className?: string;
  rows?: number;
}

const TextArea = ({
  value,
  onChange,
  name,
  placeholder,
  error,
  maxLength,
  className,
  rows = 1,
}: TextAreaProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  }, [value]);

  const wrapperClassName = classNames(styles.wrap, className, {
    [styles.error]: Boolean(error),
  });

  const length = value.length;

  return (
    <div className={wrapperClassName}>
      <div className={styles.field}>
        <textarea
          ref={textareaRef}
          className={styles.textarea}
          value={value}
          onChange={onChange}
          name={name}
          maxLength={maxLength}
          placeholder={placeholder}
          rows={rows}
        />
        {maxLength && (
          <span className={styles.counter}>
            {length}/{maxLength}
          </span>
        )}
      </div>
    </div>
  );
};

export default TextArea;
