import React, { useContext, useState } from "react";
import "./AuthForm.css";
import { UserContext } from "./UserContext";
const AuthForm = () => {
  const { user, setUser } = useContext(UserContext);
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
  async function handleLogin() {
    console.log("Logging In", formData);
    let userData = formData;
    try {
      const response = await fetch("http://127.0.0.1:8000/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          username: userData.email,
        }), // Payload
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json(); // Parse the JSON response
      console.log("Login successful:", data);

      localStorage.setItem("user", data);
      setUser(data);
      return data;
    } catch (error) {
      console.error("Error during login:", error);
    }
  }
  async function handleRegister() {
    console.log("Registering", formData);
    let userData = formData;
    try {
      const response = await fetch("http://127.0.0.1:8000/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userData.email,
          password: userData.password,
          username: userData.email,
          full_name: userData.name,
        }),
      });

      if (!response.ok) {
        throw new Error("Register failed");
      }

      const data = await response.json(); // Parse the JSON response
      console.log("Register successful:", data);
      localStorage.setItem("user", data);
      setUser(data);
      return data; // This may include token or user info
    } catch (error) {
      console.error("Error during register:", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // await submitCallback(formData, isLogin, setUser);
    if (isLogin) {
      handleLogin();
    } else {
      handleRegister();
    }
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
