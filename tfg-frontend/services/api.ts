// services/api.ts
import { useAuthStore } from '@/store/authStore';
import { refrescarSesionServidor } from '@/app/actions/auth';

export async function peticionAutenticada(endpoint: string, opciones: RequestInit = {}) {
    let token = useAuthStore.getState().token;
    const headers = new Headers(opciones.headers || {});
    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
    }
    if (token) headers.set('Authorization', `Bearer ${token}`);

    let response = await fetch(`http://172.31.245.33:8080/api${endpoint}`, { ...opciones, headers });

    // SI HAY ERROR 401 (TOKEN CADUCADO)
    if (response.status === 401) {
        const result = await refrescarSesionServidor();

        if (result.success && result.token) {
            // Actualizamos Zustand y reintentamos
            useAuthStore.getState().setToken(result.token);
            headers.set('Authorization', `Bearer ${result.token}`);
            response = await fetch(`http://172.31.245.33:8080/api${endpoint}`, { ...opciones, headers });
        } else {
            // Si el refresh también falla, al login
            useAuthStore.getState().limpiarToken();
            window.location.href = '/login';
        }
    }
    return response;
}