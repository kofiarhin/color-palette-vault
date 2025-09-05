import React from "react";
import * as styles from "./about.styles.scss";

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <h1>About</h1>
      <p>
        Color Palette Vault is a platform where designers and developers can
        save, organize, and explore unique color palettes for their projects.
      </p>
      <p>
        Whether you’re working on a website, app, or creative design, our vault
        helps you find the right colors quickly and stay inspired.
      </p>
    </div>
  );
};

export default About;
