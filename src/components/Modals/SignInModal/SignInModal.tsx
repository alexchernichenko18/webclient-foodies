import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

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
  const [touched, setTouched] = useState({ email: false, password: false });
  const [validationErrors, setValidationErrors] = useState({ email: "", password: "" });

  const isFormValid = isValidEmail(email) && isValidPassword(password);

  const validateEmail = (value: string) => {
    if (!value.trim()) {
      return "Email is required";
    }
    if (!isValidEmail(value)) {
      return "Please enter a valid email address";
    }
    return "";
  };

  const validatePassword = (value: string) => {
    if (!value.trim()) {
      return "Password is required";
    }
    if (!isValidPassword(value)) {
      return "Password must be at least 6 characters long";
    }
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (touched.email) {
      setValidationErrors((prev) => ({ ...prev, email: validateEmail(value) }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    if (touched.password) {
      setValidationErrors((prev) => ({ ...prev, password: validatePassword(value) }));
    }
  };

  const handleEmailBlur = () => {
    setTouched((prev) => ({ ...prev, email: true }));
    setValidationErrors((prev) => ({ ...prev, email: validateEmail(email) }));
  };

  const handlePasswordBlur = () => {
    setTouched((prev) => ({ ...prev, password: true }));
    setValidationErrors((prev) => ({ ...prev, password: validatePassword(password) }));
  };

  const handleClose = () => {
    setEmail("");
    setPassword("");
    setTouched({ email: false, password: false });
    setValidationErrors({ email: "", password: "" });
    dispatch(resetAuthError());
    dispatch(closeSignInModal());
  };

  const goToSignUpHandler = () => {
    handleClose();
    dispatch(openSignUpModal());
  };

  const handleSubmit = async () => {
    // Відмічаємо всі поля як touched для показу помилок
    setTouched({ email: true, password: true });
    
    // Валідуємо всі поля
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setValidationErrors({
      email: emailError,
      password: passwordError,
    });

    if (emailError || passwordError || !isFormValid || loading) {
      return;
    }

    try {
      await dispatch(
        loginThunk({
          email,
          password,
          sessionData: {
            source: "web",
          },
        })
      ).unwrap();

      handleClose();

      // Показуємо повідомлення після закриття модального вікна
      setTimeout(() => {
        iziToast.success({
          title: "Success",
          message: "You have successfully signed in!",
        });
      }, 300);
    } catch (err) {
      iziToast.error({
        title: "Error",
        message: error || "Failed to sign in. Please check your credentials.",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="SIGN IN">
      <div className={styles.content}>
        <div>
          <Input
            placeholder="Email*"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            className={styles.input}
          />
          {touched.email && validationErrors.email && (
            <div className={styles.validationError}>{validationErrors.email}</div>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password*"
            value={password}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            className={styles.input}
          />
          {touched.password && validationErrors.password && (
            <div className={styles.validationError}>{validationErrors.password}</div>
          )}
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <Button variant="dark" expanded disabled={!isFormValid || loading} onClick={handleSubmit} className={styles.submitButton}>
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
