'use client';

import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Briefcase, Mail, User } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useMemo } from "react";

interface Solicitud {
    nombre: string;
    apellido1: string;
    apellido2: string;
    puesto: string;
    email: string;
    rol: string;
    estado: string;
}

export default function SolicitudesDashboard() {
    const router = useRouter();

    const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState("");

    const token = useAuthStore((state) => state.token);

    const rol = useMemo(() => {
        if (!token) return null;

        try {
            const tokenDecodificado = jwtDecode(token) as any;
            return tokenDecodificado.rol;

        } catch (error) {
            console.error("Error al decodificar el token en el NavBar:", error);
            return null;
        }
    }, [token]);

    useEffect(() => {
        if (!token || (rol !== "Admin" && rol !== "ROLE_Admin")) {
            router.push('/');
            return;
        }

        const cargarSolicitudes = async () => {
            try {
                const response = await fetch(`http://172.31.245.33:8080/api/admin/solicitudes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) throw new Error("Error al obtener las solicitudes");

                const data = await response.json();
                setSolicitudes(data);
            } catch (err) {
                setError("No se pudieron cargar las solicitudes. Revisa la conexión con el servidor.");
            } finally {
                setCargando(false);
            }
        };

        cargarSolicitudes();
    }, [token, rol, router]);

    const gestionarSolicitud = async (email: string, accion: 'aprobar' | 'rechazar') => {
        const solicitudesAnteriores = [...solicitudes];

        setSolicitudes(solicitudes.filter(s => s.email !== email));

        try {
            const emailSeguro = encodeURIComponent(email);
            const url = `http://172.31.245.33:8080/api/admin/solicitudes/${emailSeguro}/${accion}`;
            const method = accion === 'aprobar' ? 'POST' : 'DELETE';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Falló al ${accion} el usuario`);
            }

        } catch (error) {
            console.error(error);
            alert(`Hubo un error al intentar ${accion} la solicitud.`);
            setSolicitudes(solicitudesAnteriores);
        }
    };

    if (cargando) {
        return (
            <div className="min-h-screen bg-gray-50 flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 p-8">
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded shadow-sm max-w-2xl mx-auto">
                    <p className="text-red-700 font-medium">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Panel de Solicitudes</h1>
                    <p className="mt-2 text-gray-600">
                        Gestiona los accesos pendientes de aprobación al sistema.
                    </p>
                </div>

                {solicitudes.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                        <CheckCircle className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900">Todo al día</h3>
                        <p className="mt-1 text-gray-500">No hay ninguna solicitud de registro pendiente.</p>
                    </div>
                ) : (
                    <div className="grid gap-6 md:grid-cols-2">
                        {solicitudes.map((solicitud) => (
                            <div
                                key={solicitud.email}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                            >
                                <div className="p-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                                            <User size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {solicitud.nombre} {solicitud.apellido1} {solicitud.apellido2}
                                            </h3>
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                                Pendiente
                                            </span>
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Mail className="mr-2 h-4 w-4 text-gray-400" />
                                            {solicitud.email}
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <Briefcase className="mr-2 h-4 w-4 text-gray-400" />
                                            {solicitud.puesto} • Se solicita rol: <span className="font-semibold ml-1">{solicitud.rol}</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => gestionarSolicitud(solicitud.email, 'aprobar')}
                                            className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            <CheckCircle size={18} />
                                            Aprobar
                                        </button>
                                        <button
                                            onClick={() => gestionarSolicitud(solicitud.email, 'rechazar')}
                                            className="flex-1 flex items-center justify-center gap-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                        >
                                            <XCircle size={18} />
                                            Rechazar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}