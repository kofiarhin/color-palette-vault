import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await dispatch(login(form)).unwrap();
      navigate("/dashboard");
    } catch (err) {
      setError(err || "Login failed");
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
        />
        {error && <p role="alert">{error}</p>}
        <button type="submit">Login</button>
      </form>
    </section>
  );
};

export default Login;
