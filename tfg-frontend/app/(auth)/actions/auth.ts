'use server'
import { cookies } from 'next/headers';

export async function postLogIn(prevState: any, data: FormData) {

    const mail = data.get('email');
    const password = data.get('password');

    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
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

    //console.log("=== RESPUESTA DE SPRING BOOT ===");
    //console.log("Status:", response.status);
    //console.log("JSON recibido:", result);
    //console.log("================================");

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
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    if (token) {
        try {
            await fetch(`${API_BASE_URL}/api/auth/logout`, {
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


export async function refrescarSesionServidor() {
    const cookieStore = await cookies();
    
    const refreshToken = cookieStore.get('refreshToken')?.value;
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

    if (!refreshToken) return { success: false };

    try {
        const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
            method: 'GET',
            headers: {
                'Cookie': `refreshToken=${refreshToken}`
            }
        });

        if (!response.ok) return { success: false };


        const data = await response.json();

        //console.log("=== RESPUESTA DE SPRING BOOT ===");
        //console.log("Status:", response.status);
        //console.log("JSON recibido del refresh:", data);
        //console.log("================================");

        cookieStore.set({
            name: 'refreshToken',
            value: data.tokenRefresco,
            httpOnly: true,
            path: '/'
        });

        return { success: true, token: data.tokenAcceso };

    } catch (error) {
        return { success: false };
    }
}

export async function postSingIn(prevState: any, data: FormData) {
    const nombre = data.get('nombre');
    const apellido1 = data.get('apellido1');
    const apellido2 = data.get('apellido2');
    const puesto = data.get('puesto');
    const email = data.get('email') as string;

    const dominiosValidos = ['@salud.aragon.es', '@aragon.es', '@unizar.es'];
    const esValido = dominiosValidos.some(dominio => email.endsWith(dominio));

    if (!esValido) {
        return {
            success: false,
            message: "Por favor, usa un correo corporativo válido (@salud.aragon.es, @aragon.es o @unizar.es)."
        };
    }

    const rolForm = data.get('rol');
    let rol = "";
    if (rolForm === "admin") {
        rol = "Admin";
    } else if (rolForm === "usuario") {
        rol = "User";
    }
    const password = data.get('password');
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

    try {
        await fetch(`${API_BASE_URL}/api/auth/singIn`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, apellido1, apellido2, puesto, email, rol, password }),
        });
    } catch (error) {
        console.error("No se pudo enviar la solicitud", error);
    }

    return { success: true };
}