// src/service/PrivateRoute.tsx
import { Navigate } from 'react-router-dom';
import { AuthService } from './AuthService';
import { ReactNode } from 'react';

interface PrivateRouteProps {
    children: ReactNode;
}

// Komponente zum Schützen von Routen
export const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuthenticated = AuthService.isAuthenticated();

    // Wenn nicht authentifiziert, zur Login-Seite umleiten
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    // Wenn authentifiziert, die geschützte Komponente anzeigen
    return <>{children}</>;
};