'use client'

import { useRouter } from 'next/navigation';
import { cerrarSesion } from '@/app/(auth)/actions/auth';
import { LogOut, House } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { jwtDecode } from 'jwt-decode';
import { useMemo } from 'react';

export default function NavBar() {
    const router = useRouter();
    const limpiarToken = useAuthStore((state) => state.limpiarToken);

    const handleLogout = async () => {
        const result = await cerrarSesion();
        if (result.success) {
            limpiarToken();
            router.push('/login');
        }
    };

    const token = useAuthStore((state) => state.token);

    const rol = useMemo(() => {
        if (!token) return null; // Si no hay token, no hay rol

        try {
            const tokenDecodificado = jwtDecode(token) as any;
            return tokenDecodificado.rol;

        } catch (error) {
            console.error("Error al decodificar el token en el NavBar:", error);
            return null;
        }
    }, [token]);

    return (
        <nav className="w-full bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div>
                <button
                    onClick={() => router.push('/')}
                    className="flex items-center justify-self-start gap-2 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer text-sm font-medium"
                >
                    <House className="w-4 h-4" />
                    Inicio
                </button>
            </div>


            <div className="flex items-center gap-4">
                {rol === "ROLE_Admin" && (
                    <button
                        onClick={() => router.push('/solicitudes')}
                        className="justify-self-end bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 text-sm font-medium"
                    >
                        Gestionar Solicitudes
                    </button>
                )}

                {rol === "ROLE_Admin" && (
                    <button
                        onClick={() => router.push('/usuarios')}
                        className="justify-self-end bg-indigo-600 text-white px-4 py-2 rounded-lg shadow hover:bg-indigo-700 text-sm font-medium"
                    >
                        Usuarios Activos
                    </button>
                )}

                {token && (
                    <button
                        onClick={handleLogout}
                        className="justify-self-end flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer text-sm font-medium"
                    >
                        <LogOut className="w-4 h-4" />
                        Cerrar sesión
                    </button>
                )}
            </div>
        </nav>
    );
}
