import React, { useState, useEffect } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { colors } from "../data/colors";
import "../app.styles.scss";

const textVariants = {
  initial: { opacity: 0, scale: 0.8, y: 50 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 120, damping: 12, duration: 1 },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -50,
    transition: { duration: 0.6 },
  },
};

const containerStyles = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "1rem",
  textAlign: "center",
  transition: "background-color 1s ease",
};

const contentStyles = {
  color: "#fff",
  width: "100%",
  maxWidth: "900px",
};

const headingStyles = {
  fontSize: "clamp(2rem, 5vw, 4rem)",
  letterSpacing: "2px",
  marginBottom: "1.5rem",
  fontWeight: "900",
  textTransform: "uppercase",
  lineHeight: 1.2,
};

const paragraphStyles = {
  fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
  marginTop: "1rem",
  lineHeight: 1.4,
};

const linkStyles = {
  display: "inline-block",
  marginLeft: "0.25rem",
};

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Motion.div
      id="app"
      style={containerStyles}
      animate={{ backgroundColor: colors[currentIndex] }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        <Motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={textVariants}
          style={contentStyles}
        >
          <Motion.h1 className="heading" style={headingStyles}>
            Color Palette Vault
          </Motion.h1>

          <Motion.p style={paragraphStyles}>
            Follow on Instagram{" "}
            <Motion.a
              href="https://www.instagram.com/colorpalettevault/"
              target="_blank"
              rel="noreferrer"
              whileHover={{
                scale: 1.2,
                color: "#FFD700",
                textShadow: "0px 0px 12px rgba(255, 215, 0, 1)",
                transition: { duration: 0.4 },
              }}
              style={linkStyles}
            >
              Click Here
            </Motion.a>
          </Motion.p>
        </Motion.div>
      </AnimatePresence>
    </Motion.div>
  );
};

export default Home;
