import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

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
  const [touched, setTouched] = useState({ name: false, email: false, password: false });
  const [validationErrors, setValidationErrors] = useState({ name: "", email: "", password: "" });

  const isFormValid = name.trim().length > 0 && isValidEmail(email) && isValidPassword(password);

  const validateName = (value: string) => {
    if (!value.trim()) {
      return "Name is required";
    }
    if (value.trim().length < 2) {
      return "Name must be at least 2 characters long";
    }
    return "";
  };

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

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);
    if (touched.name) {
      setValidationErrors((prev) => ({ ...prev, name: validateName(value) }));
    }
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

  const handleNameBlur = () => {
    setTouched((prev) => ({ ...prev, name: true }));
    setValidationErrors((prev) => ({ ...prev, name: validateName(name) }));
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
    setName("");
    setEmail("");
    setPassword("");
    setTouched({ name: false, email: false, password: false });
    setValidationErrors({ name: "", email: "", password: "" });
    dispatch(resetAuthError());
    dispatch(closeSignUpModal());
  };

  const goToSignInHandler = () => {
    handleClose();
    dispatch(openSignInModal());
  };

  const handleSubmit = async () => {
    // Відмічаємо всі поля як touched для показу помилок
    setTouched({ name: true, email: true, password: true });
    
    // Валідуємо всі поля
    const nameError = validateName(name);
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);
    
    setValidationErrors({
      name: nameError,
      email: emailError,
      password: passwordError,
    });

    if (nameError || emailError || passwordError || !isFormValid || loading) {
      return;
    }

    try {
      await dispatch(
        registerThunk({
          name,
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
          message: "Account created successfully!",
        });
      }, 300);
    } catch (err) {
      iziToast.error({
        title: "Error",
        message: error || "Failed to create account. Please try again.",
      });
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="CREATE ACCOUNT">
      <div className={styles.content}>
        <div>
          <Input
            placeholder="Name*"
            value={name}
            onChange={handleNameChange}
            onBlur={handleNameBlur}
            className={styles.input}
          />
          {touched.name && validationErrors.name && (
            <div className={styles.validationError}>{validationErrors.name}</div>
          )}
        </div>

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
