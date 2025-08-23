'use client';

import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
  redirectTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requiredRole,
  redirectTo = '/login',
}) => {
  const { state } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!state.loading) {
      if (!state.isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (requiredRole && state.user?.role !== requiredRole) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [state.isAuthenticated, state.user?.role, state.loading, requiredRole, router, redirectTo]);

  // Show loading while checking authentication
  if (state.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Don't render children if not authenticated or wrong role
  if (!state.isAuthenticated) {
    return null;
  }

  if (requiredRole && state.user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}; 