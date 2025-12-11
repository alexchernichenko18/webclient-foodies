import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store";
import { closeSignUpModal, openSignInModal } from "../../../store/slices/modalSlice";
import { registerThunk, resetAuthError } from "../../../store/slices/authSlice";

import Modal from "../../Modal/Modal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { isValidEmail, isValidPassword } from "../../../helpers/validations";

import styles from "./SignUpModal.module.scss";

const SignUpModal = () => {
  const isOpen = useSelector((state: RootState) => state.modal.signUpOpen);
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid =
    name.trim().length > 0 &&
    isValidEmail(email) &&
    isValidPassword(password);

  const handleClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    dispatch(resetAuthError());
    dispatch(closeSignUpModal());
  };

  const goToSignInHandler = () => {
    handleClose();
    dispatch(openSignInModal());
  };

  const handleSubmit = async () => {
    if (!isFormValid || loading) return;

    try {
      await dispatch(
        registerThunk({
          name,
          email,
          password,
          sessionData: {
            source: "web",
          },
        }),
      ).unwrap();

      handleClose();
    } catch {
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="CREATE ACCOUNT">
      <div className={styles.content}>
        <Input
          placeholder="Name*"
          value={name}
          onChange={e => setName(e.target.value)}
          className={styles.input}
        />

        <Input
          placeholder="Email*"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.input}
        />

        <Input
          type="password"
          placeholder="Password*"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className={styles.input}
        />

        {error && <div className={styles.error}>{error}</div>}

        <Button
          variant="dark"
          expanded
          disabled={!isFormValid || loading}
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          {loading ? "CREATING..." : "CREATE"}
        </Button>

        <div className={styles.bottomText} onClick={goToSignInHandler}>
          I already have an account? <span>Sign in</span>
        </div>
      </div>
    </Modal>
  );
};

export default SignUpModal;