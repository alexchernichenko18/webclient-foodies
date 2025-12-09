import { Outlet } from "react-router-dom";
import HeroSection from "../../components/HeroSection/HeroSection";
import Header from "../../components/Header/Header";

import styles from "./LayoutPublic.module.scss";

const LayoutPublic = () => {
  return (
    <div className={styles.wrap}>
      <Header variant="dark" />
      <HeroSection />
      <Outlet />
    </div>
  );
};

export default LayoutPublic;