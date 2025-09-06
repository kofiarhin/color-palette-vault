import { useEffect } from "react";
import { BASE_URL } from "./constants/constants";
import "./app.styles.scss";
import ColorPalette from "./components/ColorPalette/ColorPalette";
import NavBar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import About from "./pages/About/About";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

const App = () => {
  useEffect(() => {
    const getUsers = async () => {
      console.log(BASE_URL);
      const res = await fetch(BASE_URL);
      const data = await res.json();
      console.log({ data });
    };
    getUsers();
  }, []);
  return (
    <div class="container">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
