'use client';

import { useEffect, useState, useMemo } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { Trash2, Search, UserCheck, Shield, User as UserIcon } from "lucide-react";
import { jwtDecode } from "jwt-decode";

interface UsuarioActivo {
    nombre: string;
    apellido1: string;
    apellido2: string;
    puesto: string;
    email: string;
    rol: string;
    estado: string;
}

export default function UsuariosActivosDashboard() {
    const router = useRouter();
    const token = useAuthStore((state) => state.token);
    
    const [usuarios, setUsuarios] = useState<UsuarioActivo[]>([]);
    const [busqueda, setBusqueda] = useState("");
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const API_BASE_URL = "http://172.31.245.33:8080/api/admin";

    const rol = useMemo(() => {
        if (!token) return null;
        try {
            const decoded = jwtDecode(token) as any;
            return decoded.rol || decoded.role || decoded.authorities?.[0];
        } catch (e) {
            return null;
        }
    }, [token]);

    useEffect(() => {
        if (!token || (rol !== "Admin" && rol !== "ROLE_Admin")) {
            router.push('/');
            return;
        }

        const cargarUsuarios = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/usuarios`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!response.ok) throw new Error("Error al obtener los usuarios");

                const data = await response.json();
                setUsuarios(data);
            } catch (err) {
                setError("No se pudieron cargar los usuarios.");
            } finally {
                setCargando(false);
            }
        };

        cargarUsuarios();
    }, [token, rol, router]);

    const eliminarUsuario = async (email: string, nombre: string) => {
        const confirmacion = window.confirm(`¿Estás seguro de que deseas eliminar permanentemente el acceso de ${nombre} (${email})?`);
        
        if (!confirmacion) return;

        const usuariosAnteriores = [...usuarios];
        setUsuarios(usuarios.filter(u => u.email !== email));

        try {
            const emailSeguro = encodeURIComponent(email);
            const response = await fetch(`${API_BASE_URL}/eliminar/${emailSeguro}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) throw new Error("Falló al eliminar el usuario");

        } catch (error) {
            console.error(error);
            alert("Hubo un error al intentar eliminar al usuario.");
            setUsuarios(usuariosAnteriores);
        }
    };
    
    const usuariosFiltrados = usuarios.filter(usuario => {
        const termino = busqueda.toLowerCase();
        return (
            usuario.nombre.toLowerCase().includes(termino) ||
            usuario.apellido1.toLowerCase().includes(termino) ||
            usuario.email.toLowerCase().includes(termino) ||
            usuario.puesto.toLowerCase().includes(termino)
        );
    });

    if (cargando) return <div className="min-h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>;
    if (error) return <div className="p-8 text-red-500 font-medium text-center">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                
                {/* Cabecera y Buscador */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Usuarios Activos</h1>
                        <p className="mt-2 text-gray-600">Gestiona las cuentas con acceso al sistema.</p>
                    </div>
                    
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Buscar por nombre, email o puesto..."
                            value={busqueda}
                            onChange={(e) => setBusqueda(e.target.value)}
                            className="pl-10 pr-4 py-2 w-full md:w-80 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none"
                        />
                    </div>
                </div>

                {/* Tabla de Usuarios */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contacto</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {usuariosFiltrados.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                                            No se encontraron usuarios activos.
                                        </td>
                                    </tr>
                                ) : (
                                    usuariosFiltrados.map((usuario) => (
                                        <tr key={usuario.email} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                                        {usuario.rol === "Admin" || usuario.rol === "ROLE_Admin" ? <Shield size={18} /> : <UserIcon size={18} />}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {usuario.nombre} {usuario.apellido1}
                                                        </div>
                                                        <div className="text-sm text-gray-500">{usuario.puesto}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">{usuario.email}</div>
                                                <div className="text-sm text-green-600 flex items-center mt-1">
                                                    <UserCheck size={14} className="mr-1" /> Activo
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                    usuario.rol === 'Admin' || usuario.rol === 'ROLE_Admin' 
                                                    ? 'bg-purple-100 text-purple-800' 
                                                    : 'bg-blue-100 text-blue-800'
                                                }`}>
                                                    {usuario.rol.replace('ROLE_', '')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    onClick={() => eliminarUsuario(usuario.email, usuario.nombre)}
                                                    className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-md transition-colors flex items-center justify-end ml-auto gap-2"
                                                >
                                                    <Trash2 size={16} /> Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}