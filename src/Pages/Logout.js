import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext";

const Logout = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await logout(); // ✅ calls your AuthContext logout function
        alert("Logged out successfully!");
        navigate("/login");
      } catch (error) {
        console.error("Logout failed:", error);
        alert("Something went wrong during logout!");
      }
    };

    handleLogout();
  }, [logout, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
