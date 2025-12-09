import { Outlet } from "react-router-dom";
import Header from "../../components/Header/Header";

import styles from "./LayoutPrivate.module.scss";

const LayoutPrivate = () => {
  const isAuthenticated = true;

  return (
    <div className={styles.wrap}>
      <Header variant="light" isAuthenticated={isAuthenticated} />
      <Outlet />
    </div>
  );
};

export default LayoutPrivate;