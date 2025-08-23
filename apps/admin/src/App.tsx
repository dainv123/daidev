import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import { Themes } from "./pages/Themes";
import { Blogs } from "./pages/Blogs";
import { Certificates } from "./pages/Certificates";
import { Tags } from "./pages/Tags";
import { Images } from "./pages/Images";
import Messages from "./pages/Messages";
import { SiteSettings } from "./pages/SiteSettings";
import { Skills } from "./pages/Skills";
import { Languages } from "./pages/Languages";
import { Experience } from "./pages/Experience";
import { Education } from "./pages/Education";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Protected Route component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Public Route component (redirects if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
        <Route index element={<Dashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="themes" element={<Themes />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="tags" element={<Tags />} />
        <Route path="images" element={<Images />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<SiteSettings />} />
        <Route path="skills" element={<Skills />} />
        <Route path="languages" element={<Languages />} />
        <Route path="experience" element={<Experience />} />
        <Route path="education" element={<Education />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};

function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: "error" | "success";
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);
  return (
    <div
      className={`fixed top-4 right-4 z-50 px-4 py-2 rounded shadow-lg animate-fade-in ${type === "error" ? "bg-red-600 text-white" : "bg-green-600 text-white"}`}>
      {message}
    </div>
  );
}

const App: React.FC = () => {
  const [toast, setToast] = useState<{
    message: string;
    type: "error" | "success";
  } | null>(null);

  useEffect(() => {
    const errorHandler = (e: any) => {
      if (e.detail && typeof e.detail === "string")
        setToast({ message: e.detail, type: "error" });
    };
    const successHandler = (e: any) => {
      if (e.detail && typeof e.detail === "string")
        setToast({ message: e.detail, type: "success" });
    };
    window.addEventListener("app-error", errorHandler);
    window.addEventListener("app-success", successHandler);
    return () => {
      window.removeEventListener("app-error", errorHandler);
      window.removeEventListener("app-success", successHandler);
    };
  }, []);

  // TEST BUTTONS (remove after confirm)
  const testToast = (
    <div className="fixed bottom-4 right-4 z-50 flex gap-2">
      <button
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("app-success", { detail: "Test success!" })
          )
        }
        className="bg-green-600 text-white px-3 py-1 rounded shadow">
        Test Success
      </button>
      <button
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent("app-error", { detail: "Test error!" })
          )
        }
        className="bg-red-600 text-white px-3 py-1 rounded shadow">
        Test Error
      </button>
    </div>
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router future={{ v7_startTransition: true }}>
          <AppRoutes />
          {toast && (
            <Toast
              message={toast.message}
              type={toast.type}
              onClose={() => setToast(null)}
            />
          )}
          {/* {testToast} */}
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
