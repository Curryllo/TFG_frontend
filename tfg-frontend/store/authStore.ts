import { create } from 'zustand';

// 1. Definimos qué forma tiene nuestra memoria
interface AuthState {
    token: string | null;           // El Access Token temporal
    setToken: (token: string) => void; // Función para guardarlo
    limpiarToken: () => void;       // Función para borrarlo al salir
}

// 2. Creamos la memoria global
export const useAuthStore = create<AuthState>((set) => ({
    token: null, // Estado inicial: no hay token
    
    setToken: (nuevoToken) => set({ token: nuevoToken }),
    
    limpiarToken: () => set({ token: null }),
}));