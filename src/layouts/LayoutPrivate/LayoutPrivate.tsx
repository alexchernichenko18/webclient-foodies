import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

import { RootState } from "../../store";
import styles from "./LayoutPrivate.module.scss";

const LayoutPrivate = () => {
 const isAuth = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (!isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={styles.wrap}>
      <Header variant="light" />
      <Outlet />
    </div>
  );
};

export default LayoutPrivate;