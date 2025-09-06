import { useEffect } from "react";
import { BASE_URL } from "./constants/constants";
import "./app.styles.scss";

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
    <div id="app">
      <h1> Color Palette Vault </h1>
      <p>Watch this space!</p>
    </div>
  );
};

export default App;
