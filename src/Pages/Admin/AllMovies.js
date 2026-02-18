import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AllMovies = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

 
  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/movies/all-movies");
      const data = await response.json();
      console.log("Fetched data:", data);

      
      setMovies(Array.isArray(data) ? data : data.movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  
  useEffect(() => {
    fetchMovies();
  }, []);

 
  const handleEdit = (id) => {
    navigate(`/update-movie/${id}`);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2 style={{ textAlign: "center", color: "#6b21a8" }}>🎬 All Movies List</h2>

      <table
        style={{
          width: "100%",
          marginTop: "20px",
          borderCollapse: "collapse",
          backgroundColor: "#f3e8ff",
        }}
      >
        <thead style={{ backgroundColor: "#9333ea", color: "white" }}>
          <tr>
            <th style={styles.th}>S.No</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Image</th>
            <th style={styles.th}>Year</th>
            <th style={styles.th}>Genre</th>
            <th style={styles.th}>Details</th>
            <th style={styles.th}>Cast</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>

        <tbody>
          {movies && movies.length > 0 ? (
            movies.map((movie, index) => (
              <tr key={movie._id}>
                <td style={styles.td}>{index + 1}</td>
                <td style={styles.td}>{movie.name}</td>

                {/* 🎞️ Movie Poster */}
                <td style={styles.td}>
                  <img
                    src={movie.image}
                    alt={movie.name}
                    style={{
                      width: "80px",
                      height: "100px",
                      borderRadius: "8px",
                      objectFit: "cover",
                    }}
                  />
                </td>

                <td style={styles.td}>{movie.year}</td>

                {/* 🎭 Genre name display (backend sends object or string) */}
                <td style={styles.td}>
                  {movie.genre?.name || movie.genre || "Unknown"}
                </td>

                <td style={styles.td}>{movie.detail}</td>

                {/* 👨‍🎤 Cast display — supports both array and string */}
                <td style={styles.td}>
                  {Array.isArray(movie.cast) ? movie.cast.join(", ") : movie.cast}
                </td>

                {/* ✏️ Edit Button */}
                <td style={styles.td}>
                  <button
                    onClick={() => handleEdit(movie._id)}
                    style={styles.editBtn}
                  >
                    ✏️ Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "15px" }}>
                No movies found 😢
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// 🎨 Styles
const styles = {
  th: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
  },
  td: {
    padding: "10px",
    border: "1px solid #ddd",
    textAlign: "center",
    verticalAlign: "middle",
  },
  editBtn: {
    padding: "6px 12px",
    backgroundColor: "#9333ea",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
  },
};

export default AllMovies;
