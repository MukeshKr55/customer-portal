import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import MainMenu from "./pages/MainMenu";
import Navbar from "./components/Navbar";
import OrderHistory from "./pages/OrderHistory";
import NewOrder from "./pages/NewOrder";
import Invoice from "./pages/Invoice";

function App() {
  // Initialize authentication state by checking localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // Function to handle login
  const handleLogin = (isLoggedIn) => {
    setIsAuthenticated(isLoggedIn);
    localStorage.setItem("isAuthenticated", isLoggedIn); // Persist authentication state in localStorage
  };

  // Function to handle sign out
  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated"); // Remove authentication state from localStorage on sign out
  };

  return (
    <Router>
      {/* Conditionally render Navbar if authenticated */}
      {isAuthenticated && <Navbar onSignOut={handleSignOut} />}
      {/* Pass the sign-out function */}
      <div className={isAuthenticated ? "ml-96" : "ml-0"}>
        <Routes>
          {/* Redirect to main menu if user is authenticated and tries to visit login */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/main-menu" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route path="/main-menu" element={<MainMenu />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/new-order" element={<NewOrder />} />
          <Route path="/invoice" element={<Invoice />} />
          <Route
            path="/"
            element={
              <Navigate to={isAuthenticated ? "/main-menu" : "/login"} />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
