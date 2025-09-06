import React, { useState, useEffect } from "react";
import { colors } from "../data/colors";
import { Link } from "react-router-dom";
import "../app.styles.scss";

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
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
        backgroundColor: colors[currentIndex],
      }}
    >
      <div
        style={{
          color: "#fff",
          width: "100%",
          maxWidth: "900px",
        }}
      >
        <h1
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            letterSpacing: "2px",
            marginBottom: "1.5rem",
            fontWeight: "900",
            textTransform: "uppercase",
            lineHeight: 1.2,
          }}
        >
          Color Palette Vault
        </h1>

        <p
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.5rem)",
            marginTop: "1rem",
            lineHeight: 1.4,
          }}
        >
          Follow on Instagram{" "}
          <Link
            to="/palettes"
            style={{
              display: "inline-block",
              marginLeft: "0.25rem",
              transition: "transform 0.3s ease, color 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.2)";
              e.target.style.color = "#FFD700";
              e.target.style.textShadow = "0px 0px 12px rgba(255, 215, 0, 1)";
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)";
              e.target.style.color = "#fff";
              e.target.style.textShadow = "none";
            }}
          >
            Explore Colors
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Home;
