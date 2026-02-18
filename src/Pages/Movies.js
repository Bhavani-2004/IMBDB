import React, { useEffect, useState } from "react";

const Movies = () => {
  
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [sortBy, setSortBy] = useState("");

 
  useEffect(() => {
    fetchAllMovies();
    fetchGenres();
  }, []);

 
  const fetchAllMovies = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/movies/all-movies");
      const data = await res.json();
      setMovies(Array.isArray(data) ? data : data.movies || []);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

 
  const fetchGenres = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/genre/genres");
      const data = await res.json();
      setGenres(Array.isArray(data) ? data : data.genres || []);
    } catch (err) {
      console.error("Error fetching genres:", err);
    }
  };


  const fetchMoviesByType = async (type) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/movies/${type}`);
      const data = await res.json();
      setMovies(Array.isArray(data) ? data : data.movies || []);
    } catch (err) {
      console.error(`Error fetching ${type} movies:`, err);
    }
  };

 
  const handleSortChange = (value) => {
    setSortBy(value);
    if (value === "new") fetchMoviesByType("new-movies");
    else if (value === "top") fetchMoviesByType("top-movies");
    else if (value === "random") fetchMoviesByType("random-movies");
    else fetchAllMovies();
  };

 
  const getGenreName = (id) => {
    const g = genres.find((x) => x._id === id);
    return g ? g.name : "";
  };

  
  const Years = [...new Set(movies.map((m) => m.year))];

  
  const filteredMovies = movies.filter((movie) => {
    const nameMatch = movie.name.toLowerCase().includes(search.toLowerCase());
    const genreMatch = selectedGenre ? movie.genre === selectedGenre : true;
    const yearMatch = selectedYear ? String(movie.year) === selectedYear : true;
    return nameMatch && genreMatch && yearMatch;
  });

  
  return(
  <div
    style={{
      padding: "40px",
      backgroundColor: "#f8f5ff",
      minHeight: "100vh",
      fontFamily: "Poppins, sans-serif",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        color: "#6d28d9",
        fontSize: "2.5rem",
        letterSpacing: "1px",
        marginBottom: "10px",
      }}
    >
      🎬 The Movies Hub
    </h1>
    <h3
      style={{
        textAlign: "center",
        color: "#7e22ce",
        marginBottom: "40px",
        fontWeight: "400",
      }}
    >
      Discover and Explore Your Favorite Movies
    </h3>

    {/* 🔍 Filters Section */}
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "15px",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "40px",
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "10px 15px",
          borderRadius: "10px",
          border: "1px solid #d1c4e9",
          outline: "none",
          width: "220px",
          transition: "0.3s",
          fontSize: "14px",
        }}
        onFocus={(e) => (e.target.style.borderColor = "#7e22ce")}
        onBlur={(e) => (e.target.style.borderColor = "#d1c4e9")}
      />

      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        style={{
          padding: "10px 15px",
          borderRadius: "10px",
          border: "1px solid #d1c4e9",
          outline: "none",
          width: "180px",
          cursor: "pointer",
          backgroundColor: "#fff",
          fontSize: "14px",
        }}
      >
        <option value="">All Genres</option>
        {genres.map((g) => (
          <option key={g._id} value={g._id}>
            {g.name}
          </option>
        ))}
      </select>

      <select
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        style={{
          padding: "10px 15px",
          borderRadius: "10px",
          border: "1px solid #d1c4e9",
          outline: "none",
          width: "150px",
          backgroundColor: "#fff",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        <option value="">All Years</option>
        {Years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <select
        value={sortBy}
        onChange={(e) => handleSortChange(e.target.value)}
        style={{
          padding: "10px 15px",
          borderRadius: "10px",
          border: "1px solid #d1c4e9",
          outline: "none",
          width: "160px",
          backgroundColor: "#fff",
          cursor: "pointer",
          fontSize: "14px",
        }}
      >
        <option value="">Sort By</option>
        <option value="new">New Movies</option>
        <option value="top">Top Movies</option>
        <option value="random">Random Movies</option>
      </select>

      <button
        onClick={() => {
          setSearch("");
          setSelectedGenre("");
          setSelectedYear("");
          setSortBy("");
          fetchAllMovies();
        }}
        style={{
          padding: "10px 20px",
          backgroundColor: "#7e22ce",
          color: "#fff",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#6d28d9")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#7e22ce")}
      >
        Clear
      </button>
    </div>

    {/* 🎥 Movie Grid */}
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
        gap: "25px",
        justifyContent: "center",
      }}
    >
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => (
          <div
            key={movie._id}
            style={{
              backgroundColor: "#ffffff",
              borderRadius: "15px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              overflow: "hidden",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-8px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)";
            }}
          >
            <img
              src={movie.image || "https://via.placeholder.com/300x400?text=No+Image"}
              alt={movie.name}
              style={{
                width: "100%",
                height: "350px",
                objectFit: "cover",
              }}
            />
            <div style={{ padding: "15px" }}>
              <h4
                style={{
                  color: "#6d28d9",
                  fontSize: "1.1rem",
                  marginBottom: "6px",
                }}
              >
                {movie.name}
              </h4>
              <p style={{ color: "#555", margin: "4px 0" }}>
                <strong>Year:</strong> {movie.year}
              </p>
              <p style={{ color: "#777", margin: "4px 0" }}>
                <strong>Genre:</strong> {getGenreName(movie.genre) || "Unknown"}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p
          style={{
            textAlign: "center",
            color: "gray",
            fontSize: "18px",
            gridColumn: "1 / -1",
          }}
        >
          No movies found 😢
        </p>
      )}
    </div>
  </div>
);

};

// --- Styles ---
const styles = {
  container: {
    backgroundColor: "#632aaaff",
    minHeight: "100vh",
    padding: 30,
    fontFamily: "Poppins, sans-serif",
  },
  title: { textAlign: "center", color: "#5a189a", fontSize: "2.2rem" },
  subTitle: { textAlign: "center", color: "#7b2cbf", marginBottom: 20 },
  filterContainer: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 20,
  },
  searchBox: {
    padding: 10,
    borderRadius: 8,
    border: "2px solid #b794f6",
    width: 240,
    outline: "none",
  },
  dropdown: {
    padding: 10,
    borderRadius: 8,
    border: "2px solid #b794f6",
    backgroundColor: "#fff",
  },
  clearBtn: {
    padding: "10px 12px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#9b5de5",
    color: "#fff",
    cursor: "pointer",
  },
  movieGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
    gap: 20,
  },
  movieCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    boxShadow: "0 4px 12px rgba(90,24,154,0.12)",
    padding: 10,
    textAlign: "center",
    border: "1px solid #d8b4fe",
  },
  movieImg: { width: "100%", height: 250, objectFit: "cover", borderRadius: 10 },
  movieName: { color: "#5a189a", marginTop: 10, fontWeight: 600 },
  movieYear: { color: "#444", margin: "6px 0" },
  movieGenre: { color: "#7b2cbf", fontSize: 14 },
  noData: {
    gridColumn: "1 / -1",
    textAlign: "center",
    color: "#5a189a",
    fontSize: 18,
  },
};

export default Movies;
