import { createBrowserRouter, Navigate } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
}

export const router = createBrowserRouter([
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/quiz",
    element: (
      <ProtectedRoute>
        <Quiz />
      </ProtectedRoute>
    ),
  },
  {
    path: "/results",
    element: (
      <ProtectedRoute>
        <Results />
      </ProtectedRoute>
    ),
  },
]);
