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

  // 🚀 Over-the-top crazy animation variants
  const crazyVariants = {
    initial: { opacity: 0, scale: 0, rotate: -180, x: -200, skewX: "20deg" },
    animate: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      x: 0,
      skewX: "0deg",
      transition: {
        type: "spring",
        stiffness: 150,
        damping: 10,
        mass: 0.8,
      },
    },
    exit: { opacity: 0, scale: 0, rotate: 180, x: 200, skewX: "-20deg" },
  };

  // 🌈 Looping wild effects
  const loopEffects = {
    animate: {
      rotate: [0, 5, -5, 3, -3, 0],
      scale: [1, 1.05, 0.95, 1.05, 1],
      textShadow: [
        "0px 0px 5px rgba(255,255,255,0.5)",
        "0px 0px 15px rgba(255,255,255,0.8)",
        "0px 0px 30px rgba(255,255,255,1)",
        "0px 0px 15px rgba(255,255,255,0.8)",
        "0px 0px 5px rgba(255,255,255,0.5)",
      ],
    },
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
  };

  // 🎉 Extra bounce/flip on hover
  const hoverCrazy = {
    scale: [1, 1.2, 0.8, 1.1, 1],
    rotate: [0, 15, -15, 10, -10, 0],
    transition: { duration: 1 },
  };

  return (
    <div
      id="app"
      style={{
        backgroundColor: colors[currentIndex],
        transition: "background-color 1s ease",
      }}
    >
      {/* 🎆 EXPLOSIVE HEADING */}
      <motion.h1
        className="heading"
        key={currentIndex + "-h1"}
        variants={crazyVariants}
        initial="initial"
        animate="animate"
        whileHover={hoverCrazy}
        whileTap={{ scale: 0.9, rotate: -5 }}
        {...loopEffects}
        style={{ fontSize: "3.5rem", letterSpacing: "2px" }}
      >
        🌈 Color Palette Vault 🌟
      </motion.h1>

      {/* 🎇 BIGGER, BOUNCY SUBTEXT (NOW ALSO "Color Palette Vault") */}
      <motion.p
        key={currentIndex + "-p1"}
        variants={crazyVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.4 }}
        whileHover={{
          scale: 1.3,
          rotate: [0, -10, 10, 0],
          color: "#FFD700",
          transition: { duration: 0.6 },
        }}
        style={{
          fontSize: "3rem",
          fontWeight: "900",
          margin: "1rem 0",
          textTransform: "uppercase",
        }}
      >
        ⚡ Color Palette Vault ⚡
      </motion.p>

      {/* 🎭 INSTAGRAM LINK WITH ANIMATION */}
      <motion.p
        key={currentIndex + "-p2"}
        variants={crazyVariants}
        initial="initial"
        animate="animate"
        transition={{ delay: 0.8 }}
        whileHover={{
          scale: 1.2,
          rotate: [0, 5, -5, 0],
          transition: { duration: 0.8 },
        }}
        style={{ fontSize: "1.5rem", marginTop: "1rem" }}
      >
        🚀 Follow on Instagram{" "}
        <motion.a
          href="https://www.instagram.com/colorpalettevault/"
          target="_blank"
          rel="noreferrer"
          whileHover={{
            scale: 1.5,
            rotate: [0, 8, -8, 0],
            color: "#FFD700",
            textShadow: "0px 0px 12px rgba(255, 215, 0, 1)",
            transition: { duration: 0.6 },
          }}
        >
          ✨ Click Here ✨
        </motion.a>
      </motion.p>
    </div>
  );
};

export default App;
