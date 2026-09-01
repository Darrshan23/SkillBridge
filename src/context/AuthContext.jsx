import { createContext, useContext, useState } from "react";
import { mockUsers } from "../data/mockUsers";

// ---------------------------------------------------------------------------
// AuthContext
//
// WHAT THIS FILE DOES
// React Context is a way to share state (here: "who is logged in?") with
// any component in the tree, without passing props down manually through
// every layer. Think of it as a small global variable that only components
// wrapped in <AuthProvider> can read from.
//
// HOW IT WORKS RIGHT NOW (frontend-only)
// `login()` and `signup()) just search/push into the mockUsers array that
// lives in this file's memory. Nothing is saved anywhere permanent, so a
// page refresh clears the "session" (we mirror it to localStorage just so a
// refresh doesn't immediately log you out during a demo).
//
// [BACKEND] WHERE THIS PLUGS IN LATER
// - login(email, password)   -> POST /api/auth/login   (server checks the
//   hashed password and returns a JWT / session cookie)
// - signup(details)          -> POST /api/auth/signup
// - logout()                 -> POST /api/auth/logout (clear cookie)
// - currentUser              -> would be populated by decoding the JWT or by
//   calling GET /api/auth/me on app load
// Everything that reads `currentUser` or calls `login/signup/logout` below
// would NOT need to change — only the inside of this file does.
// ---------------------------------------------------------------------------

const AuthContext = createContext(null);

const STORAGE_KEY = "skillbridge_current_user";

export function AuthProvider({ children }) {
  // In-memory list of "registered" users. Using useState (not the imported
  // mockUsers directly) so that signing up actually adds a new user for the
  // rest of the session.
  const [users, setUsers] = useState(mockUsers);

  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : null;
  });

  function persist(user) {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }

  // Returns { ok: true } or { ok: false, error: "message" } so the login
  // form can show a helpful message without throwing.
  function login(email, password) {
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!match) {
      return { ok: false, error: "Incorrect email or password." };
    }
    persist(match);
    return { ok: true };
  }

  function signup({ name, email, password, role, location, company }) {
    const alreadyExists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (alreadyExists) {
      return { ok: false, error: "An account with that email already exists." };
    }

    const newUser = {
      id: `u${Date.now()}`, // [BACKEND] the database would generate this id
      name,
      email,
      password,
      role, // "seeker" or "employer"
      location,
      company: role === "employer" ? company : undefined,
      skills: [],
    };

    setUsers((prev) => [...prev, newUser]);
    persist(newUser);
    return { ok: true };
  }

  function logout() {
    persist(null);
  }

  const value = { currentUser, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Small custom hook so components can write `const { currentUser } =
// useAuth()` instead of importing useContext + AuthContext everywhere.
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used inside an <AuthProvider>");
  }
  return ctx;
}
