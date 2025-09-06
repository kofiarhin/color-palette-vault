import { useEffect } from "react";
import { BASE_URL } from "./constants/constants";
import "./app.styles.scss";
import ColorPalette from "./components/ColorPalette/ColorPalette";

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
      <ColorPalette />
    </div>
  );
};

export default App;
