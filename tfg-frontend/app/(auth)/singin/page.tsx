'use client';
import { useState } from "react";
import { postSingIn } from "@/app/(auth)/actions/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function SingInPage() {
    const router = useRouter();
    const [cargando, setCargando] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState("");
    const [mostrarPopUp, setMostrarPopUp] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCargando(true);
        setErrorMensaje("");

        const formData = new FormData(e.currentTarget);

        try {
            const result = await postSingIn(null, formData);

            if (result?.success) {
                setMostrarPopUp(true);
                setTimeout(() => {
                    setMostrarPopUp(false);
                    router.push('/');
                }, 2000);
            } else {
                setErrorMensaje(result?.message || "Error al solicitar registro");
                setCargando(false);
            }
        } catch (error) {
            setErrorMensaje("Error crítico de conexión.");
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            {mostrarPopUp && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-teal-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3 border-2 border-teal-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-bold">Solicitud realizada con éxito!</span>
                    </div>
                </div>
            )}

            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Solicitar Registro
                </h1>

                <p className="text-gray-600 mb-8">
                    Para acceder al sistema necesita una cuenta.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="nombre" className="block text-sm font-medium text-gray-600 mb-1">
                            Nombre
                        </label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="apellido1" className="block text-sm font-medium text-gray-600 mb-1">
                            Primer Apellido
                        </label>
                        <input
                            type="text"
                            id="apellido1"
                            name="apellido1"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>


                    <div>
                        <label htmlFor="apellido2" className="block text-sm font-medium text-gray-600 mb-1">
                            Segundo Apellido
                        </label>
                        <input
                            type="text"
                            id="apellido2"
                            name="apellido2"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="puesto" className="block text-sm font-medium text-gray-600 mb-1">
                            Puesto
                        </label>
                        <input
                            type="text"
                            id="puesto"
                            name="puesto"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            pattern=".+@(salud\.aragon\.es|aragon\.es|unizar\.es)$"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    <div>
                        <label htmlFor="rol" className="block text-sm font-medium text-gray-600 mb-1">
                            Rol
                        </label>
                        <select
                            id="rol"
                            name="rol"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        >
                            <option value="usuario">Usuario</option>
                            <option value="admin">Administrador</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {errorMensaje && (
                        <p className="text-red-500 text-sm font-semibold text-center">{errorMensaje}</p>
                    )}

                    <div className="pt-4 flex justify-end gap-19">
                        <button
                            type="button"
                            onClick={() => router.push('/login')}
                            className="px-6 py-3 bg-blue-300 hover:bg-blue-400 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                        >
                            Iniciar Sesión
                        </button>


                        <button
                            type="submit"
                            disabled={cargando}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                        >
                            {cargando ? 'Solicitando...' : 'Solicitar Acceso'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}