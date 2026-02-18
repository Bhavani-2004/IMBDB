import React, { useEffect, useState } from "react";

const CommentsComponent = () => {
  const [movies, setMovies] = useState([]);

  
  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/v1/movies/all-movies", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const data = await response.json();
      console.log(data);

      
      if (response.ok) {
        setMovies(Array.isArray(data) ? data : data.movies);
      } else {
        console.log("Movies not found ");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("Failed to fetch movies. Please try again later.");
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
  <div style={{ padding: "30px", backgroundColor: "#faf5ff", minHeight: "100vh" }}>
    <h2
      style={{
        textAlign: "center",
        color: "#6d28d9",
        fontSize: "2rem",
        marginBottom: "30px",
        letterSpacing: "1px",
      }}
    >
      🎬 Movie Reviews
    </h2>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
        gap: "25px",
      }}
    >
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie._id}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              overflow: "hidden",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-6px)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={movie.image}
              alt={movie.name}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "cover",
                borderTopLeftRadius: "16px",
                borderTopRightRadius: "16px",
              }}
            />
            <div style={{ padding: "20px" }}>
              <h3 style={{ color: "#7e22ce", marginBottom: "10px" }}>{movie.name}</h3>
              <p style={{ color: "#444", marginBottom: "8px" }}>
                <strong>🎞️ Year:</strong> {movie.year}
              </p>
              <p
                style={{
                  color: "#555",
                  lineHeight: "1.5",
                  fontSize: "15px",
                  marginBottom: "15px",
                }}
              >
                {movie.detail}
              </p>

              {/* ⭐ Reviews Section */}
              <div
                style={{
                  backgroundColor: "#faf5ff",
                  borderRadius: "10px",
                  padding: "15px",
                  border: "1px solid #ede9fe",
                }}
              >
                <h4 style={{ color: "#6d28d9", marginBottom: "10px" }}>User Reviews</h4>

                {movie.reviews && movie.reviews.length > 0 ? (
                  movie.reviews.map((rev, i) => (
                    <div
                      key={i}
                      style={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "10px",
                        padding: "10px 12px",
                        marginBottom: "10px",
                        transition: "background-color 0.2s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9f5ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                    >
                      <p style={{ margin: "0 0 5px" }}>
                        <strong style={{ color: "#7e22ce" }}>{rev.name}</strong>{" "}
                        ⭐ ({rev.rating}/5)
                      </p>
                      <p style={{ margin: "0 0 6px", color: "#444" }}>{rev.comment}</p>
                      <p style={{ fontSize: "12px", color: "gray" }}>
                        {new Date(rev.createdAt).toLocaleString("en-IN", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </p>
                    </div>
                  ))
                ) : (
                  <p style={{ color: "gray", textAlign: "center", margin: "10px 0" }}>
                    No reviews yet 😔
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p style={{ textAlign: "center", color: "gray", fontSize: "18px" }}>
          No movies found 😢
        </p>
      )}
    </div>
  </div>
);

};

export default CommentsComponent;
