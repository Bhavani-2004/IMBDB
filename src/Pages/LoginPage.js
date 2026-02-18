import React, { useContext } from 'react'
import { AuthContext } from '../AuthContext'
import { Link, useNavigate } from 'react-router-dom'



const LoginPage = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false)
    const [error, setError] = React.useState(null)

    const login = useContext(AuthContext).login
    const navigate = useNavigate()
    // Basic submit handler that calls a login API and broadcasts auth changes.
    const handleSubmit = async (e) => {
        e.preventDefault()
        setError(null)

        if (!email || !password) {
            setError('Email and password are required.')
            return
        }

        setLoading(true)
        try {
            // Example login endpoint - adjust to your backend
            const res = await login({ email, password })
            console.log(res)
            if (!res.success) {
                alert(res.message || 'Login failed')
            }
            navigate('/home')

        } catch (err) {
            setError(err.message || 'Unexpected error')
        } finally {
            setLoading(false)
        }
    }

    return (
    <div
      style={{
        maxWidth: "420px",
        margin: "60px auto",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 0 15px rgba(128, 0, 128, 0.3)",
        backgroundColor: "#faf5ff",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#6a1b9a",
          marginBottom: "25px",
        }}
      >
        Login to Your Account
      </h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="email"
            style={{ display: "block", color: "#6a1b9a", marginBottom: "5px" }}
          >
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6a1b9a")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", color: "#6a1b9a", marginBottom: "5px" }}
          >
            Password
          </label>
          <input
            id="password"
            
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              outline: "none",
              transition: "border-color 0.3s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "#6a1b9a")}
            onBlur={(e) => (e.target.style.borderColor = "#ccc")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: "#6a1b9a",
            color: "white",
            padding: "12px",
            fontSize: "16px",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#8e24aa")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#6a1b9a")}
        >
          {loading ? "Logging in..." : "Log in"}
        </button>

        {error && (
          <p
            style={{
              color: "red",
              marginTop: "10px",
              textAlign: "center",
              fontSize: "14px",
            }}
          >
            {error}
          </p>
        )}
      </form>

      <p
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#555",
          fontSize: "14px",
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/user-register"
          style={{
            color: "#6a1b9a",
            fontWeight: "bold",
            textDecoration: "none",
          }}
        >
          Register
        </Link>
      </p>
    </div>
  );
}

export default LoginPage
