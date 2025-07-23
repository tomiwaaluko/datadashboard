import { Link, useLocation } from "react-router-dom";

function Navigation() {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-brand">
        <Link to="/" className="brand-link">
          🌤️ <span>AstroDash</span>
        </Link>
      </div>
      <div className="nav-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          <span className="nav-icon">🏠</span>
          Dashboard
        </Link>
        <Link
          to="/search"
          className={`nav-link ${
            location.pathname === "/search" ? "active" : ""
          }`}
        >
          <span className="nav-icon">🔍</span>
          Search
        </Link>
        <Link
          to="/about"
          className={`nav-link ${
            location.pathname === "/about" ? "active" : ""
          }`}
        >
          <span className="nav-icon">ℹ️</span>
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
