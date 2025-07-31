import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./app.styles.scss";

const App = () => {
  const colors = ["#8E3A73", "#4CAF50", "#2196F3", "#FF5722", "#9C27B0"];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 3000); // change every 3 seconds

    return () => clearInterval(interval);
  }, [colors.length]);

  const textVariants = {
    initial: { opacity: 0, y: 50, scale: 0.8, rotate: -10, skewY: "5deg" },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotate: 0,
      skewY: "0deg",
      transition: {
        duration: 1,
        type: "spring",
        stiffness: 100,
        damping: 8,
      },
    },
    exit: { opacity: 0, y: -50, scale: 0.8, rotate: 10, skewY: "-5deg" },
  };

  const shimmerEffect = {
    animate: {
      textShadow: [
        "0px 0px 4px rgba(255,255,255,0.5)",
        "0px 0px 12px rgba(255,255,255,0.8)",
        "0px 0px 20px rgba(255,255,255,1)",
        "0px 0px 12px rgba(255,255,255,0.8)",
        "0px 0px 4px rgba(255,255,255,0.5)",
      ],
      scale: [1, 1.05, 1],
    },
    transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
  };

  return (
    <div
      id="app"
      style={{
        backgroundColor: colors[currentIndex],
        transition: "background-color 1s ease",
      }}
    >
      {/* MAIN HEADING */}
      <motion.h1
        className="heading"
        key={currentIndex + "-h1"}
        variants={textVariants}
        initial="initial"
        animate="animate"
        whileHover={{ scale: 1.1, rotate: -3 }}
        whileTap={{ scale: 0.95 }}
        {...shimmerEffect}
      >
        Color Palette Vault
      </motion.h1>

      {/* SUBTEXT WITH BIGGER FONT */}
      <motion.p
        key={currentIndex + "-p1"}
        variants={textVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4 }}
        whileHover={{ scale: 1.05, x: 5 }}
        style={{ fontSize: "2.5rem", fontWeight: "bold", margin: "1rem 0" }}
      >
        Watch This Space
      </motion.p>

      {/* INSTAGRAM LINK */}
      <motion.p
        key={currentIndex + "-p2"}
        variants={textVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.8 }}
        whileHover={{ rotate: 2, scale: 1.08 }}
      >
        Follow on instagram{" "}
        <motion.a
          href="https://www.instagram.com/colorpalettevault/"
          target="_blank"
          rel="noreferrer"
          whileHover={{
            color: "#FFD700",
            scale: 1.2,
            textShadow: "0px 0px 8px rgba(255, 215, 0, 1)",
          }}
        >
          Click Here
        </motion.a>
      </motion.p>
    </div>
  );
};

export default App;
