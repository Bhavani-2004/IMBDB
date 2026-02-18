import React, { useState } from "react";

const CreateGenres = () => {
  const [name, setName] = useState("");

  const fetchCreateGenresData = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/genre", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
           name
           }),
      });

      const data = await response.json();
      console.log( data);

      if (response.ok) {
        alert(" Genre Created Successfully!");
        setName("");
      } else {
        console.log(" Genre not created");
      }
    } catch (error) {
      console.error("Error fetching genres data:", error);
      alert("Failed to create genre. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎭 Create New Genre</h2>

      <input
        type="text"
        placeholder="Enter Genre Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
      />

      <button onClick={fetchCreateGenresData} style={styles.button}>
        ➕ Create Genre
      </button>
    </div>
  );
};


const styles = {
  container: {
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    minHeight: "100vh",
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Poppins, sans-serif",
  },
  title: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "10px",
    border: "none",
    width: "250px",
    marginBottom: "15px",
    fontSize: "1rem",
  },
  button: {
    backgroundColor: "#ff7eb3",
    border: "none",
    borderRadius: "10px",
    padding: "10px 20px",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};

export default CreateGenres;
