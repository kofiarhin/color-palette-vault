import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register as registerThunk } from "../store/authSlice";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await dispatch(registerThunk(form)).unwrap();
      navigate("/dashboard");
    } catch (err) {
      setError(err || "Registration failed");
    }
  };

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
        />
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
        <button type="submit">Register</button>
      </form>
    </section>
  );
};

export default Register;
