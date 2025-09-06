import { useEffect } from "react";
import { BASE_URL } from "./constants/constants";

const App = () => {
  useEffect(() => {
    const getUsers = async () => {
      console.log(BASE_URL);
      const res = await fetch(BASE_URL);
      console.log(res.ok);
    };
    getUsers();
  }, []);
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
};

export default App;
