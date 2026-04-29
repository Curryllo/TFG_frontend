'use client';
import { useState } from "react";
import { postLogIn } from "@/app/(auth)/actions/auth";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
    const router = useRouter();
    const setToken = useAuthStore((state) => state.setToken);
    const [cargando, setCargando] = useState(false);
    const [errorMensaje, setErrorMensaje] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setCargando(true);
        setErrorMensaje("");

        const formData = new FormData(e.currentTarget);

        try {
            const result = await postLogIn(null, formData);

            if (result?.success && result?.token) {
                //console.log("¡TOKEN LIMPIO RECIBIDO EN REACT!:", result.token);
                setToken(result.token);
                router.refresh();
                router.push('/');
            } else {
                setErrorMensaje(result?.message || "Error al iniciar sesión");
                setCargando(false);
            }
        } catch (error) {
            setErrorMensaje("Error crítico de conexión.");
            setCargando(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 mb-6 text-center">
                    Iniciar sesión
                </h1>

                <p className="text-gray-600 mb-8">
                    Para acceder al sistema, por favor ingrese sus credenciales.
                </p>

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
                            Email
                        </label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
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

                    <div className="pt-4 flex justify-end gap-17">
                        <button
                            type="button"
                            onClick={() => router.push('/singin')}
                            className="px-6 py-3 bg-blue-300 hover:bg-blue-400 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                        >
                            Solicitar Registro
                        </button>

                        <button
                            type="submit"
                            disabled={cargando}
                            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400"
                        >
                            {cargando ? 'Iniciando...' : 'Iniciar Sesión'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}