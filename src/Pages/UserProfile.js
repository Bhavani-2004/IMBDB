import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/v1/users/profile", {
          method: "GET",
           headers: {
           "Content-Type": "application/json",
           },
           credentials: "include", 
        });

        const data = await response.json();
        console.log(data);
        if (response.ok && data.username) {
          setUser({
           username: data.username,
          email: data.email,
            password: "",
            confirmPassword: "",
          });
        } else {
          alert(data.message || "Failed to fetch profile");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        alert("Server error while fetching profile!");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);


  const handleUpdate = async (e) => {
    e.preventDefault(); 
     console.log("Form submitted!");


    if (user.password && user.password !== user.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/v1/users/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          
          username: user.username,
          email:user.email,
          password: user.password ,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Server error while updating profile!");
    }
  };

  if (loading) return <h2 style={{ textAlign: "center" }}>Loading...</h2>;

  return (
   <div
  style={{
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 0 15px rgba(128, 0, 128, 0.3)",
    backgroundImage:
      "url('https://wallpapers.com/images/high/radhe-shyam-prabhas-and-pooja-hegde-movie-poster-v6tbnbx2o0b4upn0.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundBlendMode: "overlay",
    backgroundColor: "rgba(250, 245, 255, 0.85)", // light overlay for readability
  }}
>
  <h2 style={{ textAlign: "center", color: "#6a1b9a" }}>My Profile</h2>
  <form onSubmit={handleUpdate}>
    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", color: "#6a1b9a" }}>Name</label>
      <input
        type="text"
        value={user.username}
        onChange={(e) => setUser({ ...user, username: e.target.value })}
        className="form-control"
        required
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      />
    </div>

    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", color: "#6a1b9a" }}>Email Address</label>
      <input
        type="email"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        className="form-control"
        required
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      />
    </div>

    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", color: "#6a1b9a" }}>Password</label>
      <input
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="Enter new password (optional)"
        className="form-control"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      />
    </div>

    <div style={{ marginBottom: "15px" }}>
      <label style={{ display: "block", color: "#6a1b9a" }}>
        Confirm Password
      </label>
      <input
        type="password"
        value={user.confirmPassword}
        onChange={(e) =>
          setUser({ ...user, confirmPassword: e.target.value })
        }
        placeholder="Confirm new password"
        className="form-control"
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      />
    </div>

    <button
      type="submit"
      style={{
        width: "100%",
        backgroundColor: "#6a1b9a",
        color: "white",
        padding: "10px",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    >
      Update Profile
    </button>
  </form>
</div>
  );
};

export default UserProfile;
