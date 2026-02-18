import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

 
  const [randomMovies, setRandomMovies] = useState([]);
  const [topMovies, setTopMovies] = useState([]);
  const [newMovies, setNewMovies] = useState([]);

  
  const getRandomMovies = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/movies/random-movies");
      const data = await res.json();
      setRandomMovies(data);
    } catch (err) {
      console.error("Error fetching random movies:", err);
    }
  };


  const getTopMovies = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/movies/top-movies");
      const data = await res.json();
      setTopMovies(data);
    } catch (err) {
      console.error("Error fetching top movies:", err);
    }
  };

  
  const getNewMovies = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/movies/new-movies");
      const data = await res.json();
      setNewMovies(data);
    } catch (err) {
      console.error("Error fetching new movies:", err);
    }
  };

 
  useEffect(() => {
    getRandomMovies();
    getTopMovies();
    getNewMovies();
  }, []);

  return (
    <div style={styles.container}>

     
    

      
      <MovieCarousel title="🎡 Choose For You" movies={randomMovies} />

     
      <MovieCarousel title="🔥 Top Movies" movies={topMovies} />

      
      <MovieCarousel title="🎥 Choose Movie" movies={newMovies} />
    </div>
  );
};


const MovieCarousel = ({ title, movies }) => {
  const scrollRef = useRef(null);


  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  
  const handleClick = (movie) => {
    alert(` You clicked: ${movie.name}`);
  };

  return (
    <div style={styles.carouselSection}>
      <h3 style={styles.carouselTitle}>{title}</h3>

      <div style={{ position: "relative" }}>
    
        <button style={styles.scrollBtnLeft} onClick={() => scroll("left")}>
          ◀
        </button>

       
        <div ref={scrollRef} style={styles.carousel}>
          {movies && movies.length > 0 ? (
            movies.map((m, i) => (
              <div key={i} style={styles.card} onClick={() => handleClick(m)}>
                <img
                  src={m.image || "https://via.placeholder.com/200x250?text=No+Image"}
                  alt={m.name}
                  style={styles.movieImg}
                />
                <p style={styles.movieTitle}>{m.name}</p>
              </div>
            ))
          ) : (
            <p style={{ color: "gray" }}>No movies found...</p>
          )}
        </div>

     
        <button style={styles.scrollBtnRight} onClick={() => scroll("right")}>
          ▶
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    backgroundColor: "#0a0014",
    backgroundImage:
      "url('ttps://images3.alphacoders.com/909/909637.jpg')", 
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    color: "white",
    minHeight: "100vh",
    paddingBottom: "50px",
    fontFamily: "Poppins, sans-serif",
    backdropFilter: "brightness(0.7)",
  },


  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "linear-gradient(90deg, #4b0082, #7b1fa2)",
    boxShadow: "0 3px 10px rgba(123, 31, 162, 0.5)",
  },
  logo: {
    margin: 0,
    color: "#e1baff",
    fontWeight: "bold",
    letterSpacing: "1px",
    fontSize: "22px",
  },
  navBtn: {
    marginLeft: "15px",
    padding: "8px 16px",
    borderRadius: "8px",
    background: "linear-gradient(90deg, #7b1fa2, #9c27b0)",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    boxShadow: "0 0 10px rgba(156, 39, 176, 0.5)",
    transition: "0.3s",
  },
  navBtnHover: {
    background: "linear-gradient(90deg, #9c27b0, #ba68c8)",
  },

 
  carouselSection: {
    margin: "40px 40px",
    position: "relative",
  },
  carouselTitle: {
    marginBottom: "15px",
    fontSize: "22px",
    color: "#d1a9ff",
    fontWeight: "600",
  },

 
  carousel: {
    display: "flex",
    overflowX: "auto",
    gap: "18px",
    paddingBottom: "10px",
    scrollBehavior: "smooth",
  },


  card: {
    background: "linear-gradient(180deg, #311b92, #512da8)",
    borderRadius: "10px",
    minWidth: "200px",
    textAlign: "center",
    padding: "10px",
    cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    boxShadow: "0 0 10px rgba(81, 45, 168, 0.4)",
  },
  cardHover: {
    transform: "scale(1.07)",
    boxShadow: "0 0 25px rgba(186, 104, 200, 0.7)",
  },
  movieImg: {
    width: "100%",
    borderRadius: "8px",
    height: "240px",
    objectFit: "cover",
    border: "2px solid rgba(255,255,255,0.15)",
  },
  movieTitle: {
    marginTop: "8px",
    fontSize: "15px",
    color: "#f3e5f5",
    fontWeight: "500",
  },

 
  scrollBtnLeft: {
    position: "absolute",
    left: 0,
    top: "45%",
    zIndex: 1,
    background: "rgba(123, 31, 162, 0.7)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "38px",
    height: "38px",
    cursor: "pointer",
    boxShadow: "0 0 8px rgba(123, 31, 162, 0.6)",
    transition: "0.3s",
  },
  scrollBtnRight: {
    position: "absolute",
    right: 0,
    top: "45%",
    zIndex: 1,
    background: "rgba(123, 31, 162, 0.7)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "38px",
    height: "38px",
    cursor: "pointer",
    boxShadow: "0 0 8px rgba(123, 31, 162, 0.6)",
    transition: "0.3s",
  },
};





export default HomePage;
