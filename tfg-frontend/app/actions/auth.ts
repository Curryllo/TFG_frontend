'use server'
import { cookies } from 'next/headers';

export async function postLogIn(prevState: any, data: FormData) {

    const mail = data.get('email');
    const password = data.get('password');

    const response = await fetch('http://172.31.245.33:8080/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mail, password }),
    });

    if (!response.ok) {
        return { success: false, message: `Error del servidor: ${response.status}` };
    }

    const result = await response.json();

    console.log("=== RESPUESTA DE SPRING BOOT ===");
    console.log("Status:", response.status);
    console.log("JSON recibido:", result);
    console.log("================================");

    const tokenAcceso = result.tokenAcceso;
    const tokenRefresco = result.tokenRefresco;

    if (tokenRefresco) {
        const cookieStore = await cookies();
        cookieStore.set({
            name: 'refreshToken',
            value: tokenRefresco,
            httpOnly: true,
            path: '/'
        });
    }

    return { success: true, token: tokenAcceso };

}

export async function cerrarSesion() {
    const cookieStore = await cookies();
    const token = cookieStore.get('refreshToken')?.value;

    if (token) {
        try {
            await fetch('http://172.31.245.33:8080/api/auth/logout', {
                method: 'POST',
                headers: {
                    // Enviamos la cookie manualmente o el token en la cabecera
                    'Cookie': `refreshToken=${token}`,
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.error("No se pudo avisar al backend del logout", error);
        }
    }

    cookieStore.delete('refreshToken');

    return { success: true };
}

// app/actions/auth.ts
export async function refrescarSesionServidor() {
    const cookieStore = await cookies();
    // 1. Buscamos la cookie con el nombre exacto que espera Spring Boot
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) return { success: false };

    try {
        // 2. Llamamos a tu controlador GET /refresh
        // Pasamos la cookie manualmente en la cabecera
        const response = await fetch('http://172.31.245.33:8080/api/auth/refresh', {
            method: 'GET',
            headers: {
                'Cookie': `refreshToken=${refreshToken}`
            }
        });

        if (!response.ok) return { success: false };


        const data = await response.json();

        console.log("=== RESPUESTA DE SPRING BOOT ===");
        console.log("Status:", response.status);
        console.log("JSON recibido del refresh:", data);
        console.log("================================");

        // 3. Guardamos el nuevo Refresh Token (Rotación)
        cookieStore.set({
            name: 'refreshToken',
            value: data.tokenRefresco,
            httpOnly: true,
            path: '/'
        });

        // 4. Devolvemos el nuevo Access Token al cliente
        return { success: true, token: data.tokenAcceso };

    } catch (error) {
        return { success: false };
    }
}