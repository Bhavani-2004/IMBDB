import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const UserRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const reg = async () => {
    if (!name || !email || !password) {
      alert("Please fill all the fields!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
      });

      
      if (response.status === 201) {
        const data = await response.json();
        console.log("✅ Registered User:", data);
        alert(" Registration successful!");
        navigate("/login");
      } else if (response.status === 400) {
       
        const errorData = await response.text();
        alert(errorData || "User already exists or invalid data!");
      } else {
        const errorData = await response.text();
        alert(errorData || "Registration failed!");
      }

    } catch (error) {
      console.error("Register Error:", error);
      alert("Something went wrong while registering!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: "linear-gradient(135deg, #7f00ff, #e100ff)",
        color: "white",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "400px",
          borderRadius: "15px",
          backgroundColor: "rgba(255,255,255,0.9)",
          color: "#4b0082",
        }}
      >
        <h3 className="text-center mb-3 fw-bold">Create Account 💜</h3>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email Address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={reg}
          disabled={loading}
          className="btn w-100"
          style={{
            backgroundColor: "#7f00ff",
            color: "white",
            fontWeight: "bold",
            borderRadius: "10px",
          }}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-3">
          Already have an account?{" "}
          <span
            className="fw-bold"
            style={{ color: "#7f00ff", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default UserRegister;
