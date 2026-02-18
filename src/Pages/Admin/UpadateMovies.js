import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateMovies = () => {
  const { id } = useParams(); 
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [detail, setDetails] = useState("");
  const [cast, setCast] = useState("");
  const [genres, setGenres] = useState([]);

  
  useEffect(() => {
    const loadData = async () => {
      await fetchGenresData();
      if (id) await fetchSingleMovie();
    };
    loadData();
  }, [id]);

 
  const fetchGenresData = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/genre/genres", {
        credentials: "include",
      });
      const data = await res.json();
      setGenres(data);
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  };

  const fetchSingleMovie = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/movies/specific-movie/${id}`,
        { credentials: "include" }
      );
      const data = await res.json();
      const movieData = data.movie || data;

      if (movieData) {
        setName(movieData.name || "");
        setImage(movieData.image || "");
        setYear(movieData.year || "");
        setGenre(movieData.genre?._id || movieData.genre || "");
        setDetails(movieData.detail || "");
        setCast(
          Array.isArray(movieData.cast)
            ? movieData.cast.join(", ")
            : movieData.cast || ""
        );
      }
    } catch (error) {
      console.error("Error fetching single movie:", error);
    }
  };

  
  const updateMovie = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/movies/update-movie/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            name,
            image,
            year,
            genre,
            detail,
            cast: cast.split(",").map((c) => c.trim()),
          }),
        }
      );
      const data = await res.json();
      console.log("Update Response:", data);

      if (res.ok) {
        const selectedGenreName =
          genres.find((g) => g._id === genre)?.name || "Unknown Genre";
        alert(` Movie Updated Successfully under ${selectedGenreName} genre!`);
      } else {
        alert(" Failed to update movie!");
      }
    } catch (error) {
      console.error("Error updating movie:", error);
      alert(" Error updating movie. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎬 Update Movie</h1>

      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter Movie Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
        />

        <input
          type="text"
          placeholder="Enter Movie Poster URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Enter Release Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          style={styles.input}
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Genre</option>
          {genres.map((g) => (
            <option key={g._id} value={g._id}>
              {g.name}
            </option>
          ))}
        </select>

        <textarea
          placeholder="Enter Movie Description"
          value={detail}
          onChange={(e) => setDetails(e.target.value)}
          style={styles.textarea}
        />

        <input
          type="text"
          placeholder="Enter Cast Names (comma separated)"
          value={cast}
          onChange={(e) => setCast(e.target.value)}
          style={styles.input}
        />

        <button onClick={updateMovie} style={styles.button}>
          ✏️ Update Movie
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "40px 20px",
    background: "linear-gradient(135deg, #6a11cb, #2575fc)",
    minHeight: "100vh",
    color: "#fff",
    fontFamily: "Poppins, sans-serif",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  title: { fontSize: "2.2rem", marginBottom: "30px", textAlign: "center" },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    background: "rgba(255,255,255,0.1)",
    padding: "30px",
    borderRadius: "15px",
    width: "350px",
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
  },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "none",
    outline: "none",
    fontSize: "1rem",
    minHeight: "80px",
  },
  button: {
    background: "#ff80ab",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "12px",
    fontSize: "1rem",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default UpdateMovies;
