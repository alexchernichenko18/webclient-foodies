import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../../store";
import { closeSignInModal, openSignUpModal } from "../../../store/slices/modalSlice";
import { loginThunk, resetAuthError } from "../../../store/slices/authSlice";

import Modal from "../../Modal/Modal";
import Input from "../../ui/Input";
import Button from "../../ui/Button";

import { isValidEmail, isValidPassword } from "../../../helpers/validations";

import styles from "./SignInModal.module.scss";

const SignInModal = () => {
  const isOpen = useSelector((state: RootState) => state.modal.signInOpen);
  const { loading, error } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isFormValid = isValidEmail(email) && isValidPassword(password);

  const handleClose = () => {
    setEmail("");
    setPassword("");
    dispatch(resetAuthError());
    dispatch(closeSignInModal());
  };

  const goToSignUpHandler = () => {
    handleClose();
    dispatch(openSignUpModal());
  };

  const handleSubmit = async () => {
    if (!isFormValid || loading) return;

    try {
      await dispatch(
        loginThunk({
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
    <Modal isOpen={isOpen} onClose={handleClose} title="SIGN IN">
      <div className={styles.content}>
        <Input
          placeholder="Email*"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className={styles.input}
        />

        <Input
          type="password"
          placeholder="Password"
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
          {loading ? "SIGNING IN..." : "SIGN IN"}
        </Button>

        <div className={styles.bottomText} onClick={goToSignUpHandler}>
          Don&apos;t have an account? <span>Create an account</span>
        </div>
      </div>
    </Modal>
  );
};

export default SignInModal;