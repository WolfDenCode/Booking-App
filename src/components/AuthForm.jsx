import React, { useState } from "react";
import "./AuthForm.css";

const AuthForm = ({ submitCallback }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [isLogin, setIsLogin] = useState(true);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCallback(formData, isLogin);
  };
  const toggleAuthMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({ email: "", password: "", name: "" }); // Clear form data when switching
  };
  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isLogin ? "Login to Your Account" : "Create an Account"}</h2>
        {!isLogin && (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isLogin ? "Log In" : "Sign Up"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button className="switcher" onClick={toggleAuthMode}>
          {isLogin ? "Sign Up" : "Login"}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;
