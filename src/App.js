
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Components/Navbar';
import './App.css';

import LoginPage from './Pages/LoginPage';
import { AuthContext } from './AuthContext';
import { useContext } from 'react';
import HomePage from './Pages/HomePage';
import UserRegister from './Pages/UserRegister';
import UserProfile from './Pages/UserProfile';
import Logout from './Pages/Logout';
import Dashboard from './Pages/Admin/Dashboard';
import CreateMovies from './Pages/Admin/CreateMovies';
import CreateGenres from './Pages/Admin/CreateGenres';
import UpadateMovies from './Pages/Admin/UpadateMovies';
import Comments from './Pages/Admin/Comments';
import AllMovies from './Pages/Admin/AllMovies';
import Movies from './Pages/Movies';




function App() {
  const { isAuthenticated, isCheckingAuth } = useContext(AuthContext);

  const ProtectRoutes = ({ children }) => {
    if (isCheckingAuth) {
      return <div className="text-center mt-5">Checking authentication...</div>;
    }
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  }
  return (
    <>
      <Router>
         {isAuthenticated && <Navbar />}
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/user-register" element={<UserRegister />} />
          <Route path="/home" element={<ProtectRoutes>< HomePage /> </ProtectRoutes>} />
           <Route path="/movies" element={<ProtectRoutes>< Movies/> </ProtectRoutes>} />

          <Route path="/get-profile" element={<ProtectRoutes><UserProfile /> </ProtectRoutes>} />
          <Route path="/dashboard" element={<ProtectRoutes><Dashboard /> </ProtectRoutes>} />
          <Route path="/create-movies" element={<ProtectRoutes><CreateMovies/> </ProtectRoutes>} />
          <Route path="/all-movies" element={<ProtectRoutes><AllMovies/> </ProtectRoutes>} />
          <Route path="/create-genres" element={<ProtectRoutes><CreateGenres /> </ProtectRoutes>} />
          <Route path="/update-movie/:id" element={<ProtectRoutes><UpadateMovies /></ProtectRoutes>} />

          <Route path="/comments" element={<ProtectRoutes><Comments /> </ProtectRoutes>} />
          <Route path="/logout" element={<ProtectRoutes><Logout /> </ProtectRoutes>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
