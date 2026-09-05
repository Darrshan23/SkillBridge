import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BrowseListings from './pages/BrowseListings';
import ListingDetail from './pages/ListingDetail';
import PostListing from './pages/PostListing';
import ApplicationsTracker from './pages/ApplicationsTracker';
import EmployerDashboard from './pages/EmployerDashboard';
import Messages from './pages/Messages';
import AdminPanel from './pages/AdminPanel';
import NotFound from './pages/NotFound';

// This is the "route map" of the whole app — a single place to see every
// URL SkillBridge responds to and which page component handles it.
//
// The two Providers wrap everything so that ANY page/component below them
// can call useAuth() or useData() without needing props passed down
// manually. This is the standard shape for a small-to-medium React app
// before reaching for a bigger state library like Redux.
export default function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Navbar />
        <main className="page-container">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/browse" element={<BrowseListings />} />
            <Route path="/listing/:id" element={<ListingDetail />} />

            <Route
              path="/post"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <PostListing />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EmployerDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/applications"
              element={
                <ProtectedRoute allowedRoles={['seeker']}>
                  <ApplicationsTracker />
                </ProtectedRoute>
              }
            />
            <Route
              path="/messages"
              element={
                <ProtectedRoute allowedRoles={['seeker', 'employer']}>
                  <Messages />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminPanel />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </DataProvider>
    </AuthProvider>
  );
}
