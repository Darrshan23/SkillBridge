// ---------------------------------------------------------------------------
// mockUsers.js
//
// This file pretends to be a "users table". In a real product this data
// would live in a database (Postgres, MongoDB, etc.) and be created via a
// signup form that POSTs to something like `POST /api/auth/signup`.
//
// [BACKEND] Replace this whole file with real API calls once the backend
// exists — see AuthContext.jsx for exactly where those calls would go.
// ---------------------------------------------------------------------------

export const mockUsers = [
  {
    id: "u1",
    name: "Amara Chen",
    email: "amara@example.com",
    password: "password123", // NEVER store plaintext passwords in a real app
    role: "seeker",
    skills: ["React", "Figma", "Copywriting"],
    location: "Georgetown, Penang",
  },
  {
    id: "u2",
    name: "Devan Pillai",
    email: "devan@example.com",
    password: "password123",
    role: "seeker",
    skills: ["Python", "Data Entry", "Tutoring"],
    location: "Bayan Lepas, Penang",
  },
  {
    id: "u3",
    name: "Nadia Yusof — Kedai Kopi Nadia",
    email: "nadia@kedaikopi.com",
    password: "password123",
    role: "employer",
    company: "Kedai Kopi Nadia",
    location: "Georgetown, Penang",
  },
  {
    id: "u4",
    name: "Ben Ooi — BrightPixel Studio",
    email: "ben@brightpixel.io",
    password: "password123",
    role: "employer",
    company: "BrightPixel Studio",
    location: "Bukit Mertajam, Penang",
  },
  {
    id: "u5",
    name: "Site Admin",
    email: "admin@skillbridge.com",
    password: "admin123",
    role: "admin",
  },
];
