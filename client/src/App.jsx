import { useEffect } from "react";
import { BASE_URL } from "./constants/constants";

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
    <div>
      <h1>Hello World Update </h1>
    </div>
  );
};

export default App;
