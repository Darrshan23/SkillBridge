import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// A "dumb" presentational component: it just reads from useAuth() and
// renders links. Notice there's no local state here — everything it needs
// comes from context, which keeps this component short and easy to test.
export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <Link to="/" className="navbar__brand">
        SkillBridge
      </Link>

      <nav className="navbar__links" aria-label="Main navigation">
        <Link to="/browse">Browse gigs</Link>

        {currentUser?.role === "seeker" && (
          <Link to="/applications">My applications</Link>
        )}

        {currentUser?.role === "employer" && (
          <>
            <Link to="/post">Post a gig</Link>
            <Link to="/dashboard">Dashboard</Link>
          </>
        )}

        {currentUser?.role === "admin" && <Link to="/admin">Admin</Link>}

        {currentUser && <Link to="/messages">Messages</Link>}
      </nav>

      <div className="navbar__auth">
        {currentUser ? (
          <>
            <span className="navbar__user">
              {currentUser.name.split(" ")[0]} · {currentUser.role}
            </span>
            <button className="btn btn--ghost" onClick={handleLogout}>
              Log out
            </button>
          </>
        ) : (
          <>
            <Link className="btn btn--ghost" to="/login">
              Log in
            </Link>
            <Link className="btn btn--primary" to="/signup">
              Sign up
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
