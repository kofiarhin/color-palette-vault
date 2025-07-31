import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { colors } from "./data/colors";
import "./app.styles.scss";

const App = () => {
  // 🎨 10 harmonious colors – muted & elegant tones

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [colors.length]);

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

  return (
    <motion.div
      id="app"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "1rem",
        textAlign: "center",
        transition: "background-color 1s ease",
      }}
      animate={{ backgroundColor: colors[currentIndex] }}
      transition={{ duration: 1 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={textVariants}
          style={{ color: "#fff", width: "100%", maxWidth: "900px" }}
        >
          {/* 🎆 SINGLE HEADLINE */}
          <motion.h1
            className="heading"
            style={{
              fontSize: "clamp(2rem, 5vw, 4rem)", // responsive font scaling
              letterSpacing: "2px",
              marginBottom: "1.5rem",
              fontWeight: "900",
              textTransform: "uppercase",
              lineHeight: 1.2,
            }}
          >
            Color Palette Vault
          </motion.h1>

          {/* 🎭 INSTAGRAM LINK */}
          <motion.p
            style={{
              fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
              marginTop: "1rem",
              lineHeight: 1.4,
            }}
          >
            Follow on Instagram{" "}
            <motion.a
              href="https://www.instagram.com/colorpalettevault/"
              target="_blank"
              rel="noreferrer"
              whileHover={{
                scale: 1.2,
                color: "#FFD700",
                textShadow: "0px 0px 12px rgba(255, 215, 0, 1)",
                transition: { duration: 0.4 },
              }}
              style={{ display: "inline-block", marginLeft: "0.25rem" }}
            >
              Click Here
            </motion.a>
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default App;
