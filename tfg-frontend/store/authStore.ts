import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Definimos qué forma tiene nuestra memoria
interface AuthState {
    token: string | null;           // El Access Token temporal
    setToken: (token: string) => void; // Función para guardarlo
    limpiarToken: () => void;       // Función para borrarlo al salir
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            token: null,
            setToken: (token) => set({ token }),
            limpiarToken: () => set({ token: null }),
        }),
        {
            name: 'auth-storage', // clave en localStorage
        }
    )
);