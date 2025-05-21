// src/service/AuthService.ts
import { api } from './api';

// Auth Service zum zentralen Verwalten von Authentifizierung
export const AuthService = {
    // Token aus dem localStorage abrufen
    getToken: (): string | null => {
        return localStorage.getItem('token');
    },

    // Prüfen ob der Benutzer eingeloggt ist
    isAuthenticated: (): boolean => {
        return !!localStorage.getItem('token');
    },

    // Token zu allen API-Anfragen hinzufügen
    setupAuthInterceptor: (): void => {
        api.interceptors.request.use(
            (config) => {
                const token = AuthService.getToken();
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );
    }
};

// Direkt den Auth-Interceptor initialisieren
AuthService.setupAuthInterceptor();