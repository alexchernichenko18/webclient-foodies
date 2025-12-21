import { Outlet } from "react-router-dom";
import HeroSection from "../../components/HeroSection/HeroSection";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Testimonials from "../../components/Testimonials/Testimonials";

import styles from "./LayoutPublic.module.scss";

const LayoutPublic = () => {
  return (
    <div className={styles.wrap}>
      <Header variant="dark" />
      <HeroSection />
      <Outlet />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default LayoutPublic;