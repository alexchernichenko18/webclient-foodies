// src/components/modals/LogOutModal/LogOutModal.tsx
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../../../store";
import { closeLogOutModal } from "../../../store/slices/modalSlice";
import { setAuth } from "../../../store/slices/authSlice";

import Modal from "../../Modal/Modal";
import Button from "../../ui/Button";

import styles from "./LogOutModal.module.scss";

const LogOutModal = () => {
  const isOpen = useSelector((state: RootState) => state.modal.logOutOpen);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeLogOutModal());

  const handleLogout = () => {
    dispatch(setAuth(false));
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="ARE YOU LOGGING OUT?">
      <div className={styles.content}>
        <p className={styles.text}>You can always log back in at my time.</p>

        <Button
          variant="dark"
          expanded
          className={styles.logoutButton}
          onClick={handleLogout}
        >
          LOG OUT
        </Button>

        <Button
          variant="outlined-light"
          expanded
          className={styles.cancelButton}
          onClick={handleClose}
        >
          CANCEL
        </Button>
      </div>
    </Modal>
  );
};

export default LogOutModal;
