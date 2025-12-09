import { createPortal } from "react-dom";
import type { ReactNode, MouseEvent } from "react";
import classNames from "classnames";

import styles from "./Modal.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  className,
  contentClassName,
}: ModalProps) => {
  if (!isOpen) {
    return null;
  }

  const handleBackdropClick = () => {
    onClose();
  };

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={classNames(styles.modal, className)} onClick={handleContentClick}>
        <button type="button" className={styles.close} onClick={onClose}>
          ✕
        </button>

        {title && <h2 className={styles.title}>{title}</h2>}

        <div className={classNames(styles.content, contentClassName)}>{children}</div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;