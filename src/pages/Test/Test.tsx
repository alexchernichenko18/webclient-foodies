import styles from "./Test.module.scss";

import Button from "../../components/ui/Button";

import { ReactComponent as IconArrowUp } from "../../assets/icons/icon-arrow-up.svg";
import { ReactComponent as IconCheck } from "../../assets/icons/icon-check.svg";
import { ReactComponent as IconChevronDown } from "../../assets/icons/icon-chevron-down.svg";
import { ReactComponent as IconEyeOff } from "../../assets/icons/icon-eye-off.svg";
import { ReactComponent as IconEye } from "../../assets/icons/icon-eye.svg";
import { ReactComponent as IconFacebook } from "../../assets/icons/icon-facebook.svg";
import { ReactComponent as IconHeart } from "../../assets/icons/icon-heart.svg";
import { ReactComponent as IconInstagram } from "../../assets/icons/icon-instagram.svg";
import { ReactComponent as IconTrash } from "../../assets/icons/icon-trash.svg";
import { ReactComponent as IconYoutube } from "../../assets/icons/icon-youtube.svg";

const Test = () => {
  return (
    <div className={styles.wrap}>
      {/* TEXT BUTTONS */}
      <h3>Text Buttons</h3>
      <div className={styles.row}>
        <div>
          Light
          <Button variant="light">SIGN IN</Button>
          <Button variant="light" size="small">SIGN IN</Button>
          <Button variant="light" size="small" disabled>SIGN IN</Button>
        </div>
        <div>
          Dark
          <Button variant="dark">SIGN IN</Button>
          <Button variant="dark" size="small">SIGN IN</Button>
          <Button variant="dark" size="small" disabled>SIGN IN</Button>
        </div>
        <div>
          Outlined Light
          <Button variant="outlined-light">SIGN IN</Button>
          <Button variant="outlined-light" size="small">SIGN IN</Button>
          <Button variant="outlined-light" size="small" disabled>SIGN IN</Button>
        </div>
        <div style={{ background: "black", padding: "16px" }}>
          <span style={{ color: "white" }}>Outlined Dark</span>
          <Button variant="outlined-dark">SIGN IN</Button>
          <Button variant="outlined-dark" size="small">SIGN IN</Button>
          <Button variant="outlined-dark" size="small" disabled>SIGN IN</Button>
        </div>

        <Button variant="dark" expanded>EXPANDED</Button>
      </div>

      {/* ICON BUTTONS */}
      <h3>Icon Buttons</h3>
      <div className={styles.grid}>
        <Button variant="light" icon={<IconArrowUp />} />
        <Button variant="dark" icon={<IconArrowUp />} />

        <Button variant="light" icon={<IconCheck />} />
        <Button variant="dark" icon={<IconCheck />} />

        <Button variant="light" icon={<IconChevronDown />} />
        <Button variant="dark" icon={<IconChevronDown />} />

        <Button variant="light" icon={<IconEye />} />
        <Button variant="dark" icon={<IconEye />} />

        <Button variant="light" icon={<IconEyeOff />} />
        <Button variant="dark" icon={<IconEyeOff />} />

        <Button variant="light" icon={<IconFacebook />} />
        <Button variant="dark" icon={<IconFacebook />} />

        <Button variant="light" icon={<IconHeart />} />
        <Button variant="dark" icon={<IconHeart />} />

        <Button variant="light" icon={<IconInstagram />} />
        <Button variant="dark" icon={<IconInstagram />} />

        <Button variant="light" icon={<IconTrash />} />
        <Button variant="dark" icon={<IconTrash />} />

        <Button variant="light" icon={<IconYoutube />} />
        <Button variant="dark" icon={<IconYoutube />} />
      </div>
    </div >
  );
};

export default Test;