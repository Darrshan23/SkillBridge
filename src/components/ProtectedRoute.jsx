import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// A "wrapper" component: instead of adding an if-check to every page that
// needs auth, we wrap the page's route with this component once.
//
// Usage in App.jsx:
//   <Route path="/dashboard" element={
//     <ProtectedRoute allowedRoles={["employer"]}>
//       <EmployerDashboard />
//     </ProtectedRoute>
//   } />
//
// [BACKEND] Right now this only checks the locally-stored currentUser, so a
// determined user could edit localStorage to fake a role. A real app must
// ALSO check the user's role again on the server for every protected
// request — the frontend check is just for a smooth user experience, never
// the actual security boundary.
export default function ProtectedRoute({ children, allowedRoles }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}
