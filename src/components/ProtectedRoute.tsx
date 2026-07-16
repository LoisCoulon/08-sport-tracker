import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Chargement...</p>;
  }
  if (user === null) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}
