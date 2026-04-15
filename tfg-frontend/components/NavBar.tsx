'use client'

import { useRouter } from 'next/navigation';
import { cerrarSesion } from '@/app/actions/auth';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

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

    return (
        <nav className="w-full bg-white shadow-sm border-b border-gray-200 px-6 py-3 flex items-center justify-end">
            <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer text-sm font-medium"
            >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
            </button>
        </nav>
    );
}
