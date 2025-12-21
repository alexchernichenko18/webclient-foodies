
import { useState } from "react";

import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import TextArea from "../../components/ui/TextArea";
import Select from "../../components/ui/Select";

import Profile from "../Profile/Profile";


import styles from "./Test.module.scss";

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
import { ReactComponent as IconMinus } from "../../assets/icons/icon-minus.svg";
import { ReactComponent as IconPlus } from "../../assets/icons/icon-plus.svg";

const categoryOptions = [
  { value: "seafood", label: "Seafood" },
  { value: "meat", label: "Meat" },
  { value: "vegetarian", label: "Vegetarian" },
];

const Test = () => {
  // Input
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TextArea
  const [description, setDescription] = useState("");
  const [invalidDescription, setInvalidDescription] = useState("");

  // Select
  const [category, setCategory] = useState("");
  const [category2, setCategory2] = useState(categoryOptions[1].value);

  return (
    <div className={styles.wrap}>
      <h1>Test page</h1>
      <div className={styles.row}>
        <div>
          <h3>Inputs</h3>
          <div style={{ width: "300px" }}>
            <div>
              <Input
                type="text"
                value={email}
                onChange={event => setEmail(event.target.value)}
                name="email"
                placeholder="Email*"
              />
            </div>
            <br />
            <div>
              <Input
                type="password"
                value={password}
                onChange={event => setPassword(event.target.value)}
                name="password"
                placeholder="Password"
                error="Incorrect email or password"
              />
            </div>
          </div>
        </div>

        <div>
          <h3>TextArea</h3>
          <div style={{ width: "400px" }}>
            <TextArea
              value={description}
              onChange={event => setDescription(event.target.value)}
              placeholder="Enter a description of the dish"
              maxLength={200}
            />

            <br />

            <TextArea
              value={invalidDescription}
              onChange={event => setInvalidDescription(event.target.value)}
              placeholder="Enter a description of the dish"
              maxLength={200}
              error={true}
            />
          </div>
        </div>

        <div>
          <h3>Select Inputs</h3>

          <div style={{ width: "300px", display: "flex", flexDirection: "column", gap: "20px" }}>
            <Select
              value={category}
              onChange={e => setCategory(e.target.value)}
              placeholder="Select a category"
              options={categoryOptions}
              name="category1"
            />

            <Select
              value={category2}
              onChange={e => setCategory2(e.target.value)}
              placeholder="Select a category"
              options={categoryOptions}
              name="category2"
            />
          </div>
        </div>
      </div>

      {/* TEXT BUTTONS */}
      <h3>Text Buttons</h3>
      <div className={styles.row}>
        <div className={styles.flex}>
          Light
          <Button variant="light">SIGN IN</Button>
          <Button variant="light" size="small">SIGN IN</Button>
          <Button variant="light" size="small" disabled>SIGN IN</Button>
        </div>
        <div className={styles.flex}>
          Dark
          <Button variant="dark">SIGN IN</Button>
          <Button variant="dark" size="small">SIGN IN</Button>
          <Button variant="dark" size="small" disabled>SIGN IN</Button>
        </div>
        <div className={styles.flex}>
          Outlined Light
          <Button variant="outlined-light">SIGN IN</Button>
          <Button variant="outlined-light" size="small">SIGN IN</Button>
          <Button variant="outlined-light" size="small" disabled>SIGN IN</Button>
        </div>
        <div style={{ background: "black", padding: "16px" }} className={styles.flex}>
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

        <Button variant="light" icon={<IconMinus />} />
        <Button variant="dark" icon={<IconMinus />} />

        <Button variant="light" icon={<IconPlus />} />
        <Button variant="dark" icon={<IconPlus />} />


        
      </div>
        <h2 style={{ marginBottom: "20px" }}>Other Profile Component View:</h2>
        <Profile />
      </div>    
  );
};

export default Test;