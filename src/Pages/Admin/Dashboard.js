import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const [userCount, setUserCount] = useState(0);
    const [movieCount, setMovieCount] = useState(0);
    const [reviewCount, setReviewCount] = useState(0);

    useEffect(() => {
        fetchUserData();
        fetchAllMoviesData();
        fetchTopMoviesData();
    }, []);


    const fetchUserData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/users", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setUserCount(data.length);
            } else {
                console.warn("Users data not found or invalid format");
            }
        } catch (error) {
            console.error("Error fetching users data:", error);
        }
    };


    const fetchAllMoviesData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/movies/all-movies", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setMovieCount(data.length);
            } else {
                console.warn("Movies data not found");
            }
        } catch (error) {
            console.error("Error fetching all movies data:", error);
        }
    };


    const fetchTopMoviesData = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/v1/movies/top-movies", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {

                let totalReviews = 0;

                data.forEach(movie => {
                    totalReviews += movie.numReviews || 0;
                });

                setReviewCount(totalReviews);
                
            } else {
                console.log ("Top movies data not found");
            }
        } catch (error) {
            console.error("Error fetching top movies data:", error);
        }
    };

    return (
       <div style={styles.container}>
            <div style={styles.layout}>
             
                <aside style={styles.sidebar}>
                   
                    <ul style={styles.navList}>
                        <li><Link to="/create-movies" style={styles.navLink}> Create Movies</Link></li>
                        <li><Link to="/create-genres" style={styles.navLink}> Create Genres</Link></li>
                        <li><Link to="/all-movies" style={styles.navLink}> Update Movies</Link></li>
                        <li><Link to="/comments" style={styles.navLink}> Comments</Link></li>
                    </ul>
                </aside>

             
                <main style={styles.mainContent}>
                    <h1 style={styles.title}>🎬 Dashboard Overview</h1>

                    <div style={styles.row}>
                        <div style={styles.card}>
                            <h2 style={styles.subtitle}>👤 Total Users</h2>
                            <p style={styles.count}>{userCount}</p>
                        </div>

                        <div style={styles.card}>
                            <h2 style={styles.subtitle}>🎥 Total Movies</h2>
                            <p style={styles.count}>{movieCount}</p>
                        </div>

                        <div style={styles.card}>
                            <h2 style={styles.subtitle}>💬 Total Reviews</h2>
                            <p style={styles.count}>{reviewCount}</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};


const styles = {
    container: {
        background: "linear-gradient(135deg, #6a11cb, #2575fc)",
        minHeight: "100vh",
        color: "#fff",
        fontFamily: "Poppins, sans-serif",
        padding: "0",
        margin: "0",
    },
    layout: {
        display: "flex",
    },
    sidebar: {
        width: "250px",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        padding: "25px 15px",
        borderRight: "2px solid rgba(255,255,255,0.2)",
        borderRadius: "0 20px 20px 0",
    },
    sidebarTitle: {
        textAlign: "center",
        fontSize: "1.6rem",
        marginBottom: "20px",
        color: "#ffcbf2",
    },
    navList: {
        listStyle: "none",
        padding: 0,
    },
    navLink: {
        display: "block",
        textDecoration: "none",
        color: "#fff",
        fontSize: "1.1rem",
        padding: "10px 15px",
        marginBottom: "12px",
        borderRadius: "10px",
        background: "rgba(255,255,255,0.1)",
        transition: "0.3s",
    },
    mainContent: {
        flex: 1,
        padding: "40px 20px",
        textAlign: "center",
    },
    navLinkHover: {
        background: "#ffcbf2",
        color: "#000",
    },
    title: {
        fontSize: "2.2rem",
        marginBottom: "30px",
        letterSpacing: "1px",
    },
    row: {
        display: "flex",
        justifyContent: "center",
        gap: "25px",
        flexWrap: "wrap",
    },
    card: {
        background: "rgba(255,255,255,0.1)",
        borderRadius: "15px",
        padding: "25px",
        width: "280px",
        textAlign: "center",
        boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    },
    subtitle: {
        fontSize: "1.4rem",
        color: "#ffcbf2",
    },
    count: {
        fontSize: "2.8rem",
        fontWeight: "bold",
        marginTop: "10px",
        color: "#fff",
    },
       
}; 

export default Dashboard;
