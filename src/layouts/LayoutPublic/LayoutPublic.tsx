import { Outlet } from "react-router-dom";
import HeroSection from "../../components/HeroSection/HeroSection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import styles from "./LayoutPublic.module.scss";

const LayoutPublic = () => {
  return (
    <div className={styles.wrap}>
      <Header variant="dark" />
      <HeroSection />
      <Outlet />
      <Footer />
    </div>
  );
};

export default LayoutPublic;