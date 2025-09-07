import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home/Home.jsx";
import About from "./pages/About/About.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import PlayGround from "./pages/PlayGround/PlayGround.jsx";
import Palettes from "./pages/Palettes/Palettes.jsx";

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/playground" element={<PlayGround />} />
      <Route path="/palettes" element={<Palettes />} />
    </Routes>
  </>
);

export default App;
