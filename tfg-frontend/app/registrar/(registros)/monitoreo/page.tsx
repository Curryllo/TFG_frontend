'use client'
import { postMonitoreo } from "@/app/registrar/(registros)/monitoreo/action";
import { useState, useActionState, useEffect } from "react";

export default function MonitoreoForm() {
    const [state, formAction, isPending] = useActionState(postMonitoreo, null);

    const [mostrarPopUp, setMostrarPopUp] = useState(false);

    useEffect(() => {
        if (state?.success) {
            setMostrarPopUp(true);

            const timer = setTimeout(() => {
                setMostrarPopUp(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [state]);


    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
                        {mostrarPopUp && (
                <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
                    <div className="bg-teal-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3 border-2 border-teal-400">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="font-bold">¡Registro realizado con éxito!</span>
                    </div>
                </div>
            )}

            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Monitoreo Entomológico
            </h1>
            <p className="text-gray-600 mb-8">
                Ingrese datos de vigilancia de vectores
            </p>

            <form className="space-y-6" action={formAction}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Lugar */}
                    <div>
                        <label htmlFor="lugar" className="block text-sm font-medium text-gray-600 mb-1">
                            Lugar
                        </label>
                        <input
                            type="text"
                            id="lugar"
                            name="lugar"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Latitud */}
                    <div>
                        <label htmlFor="latitud" className="block text-sm font-medium text-gray-600 mb-1">
                            Latitud
                        </label>
                        <input
                            type="number"
                            step="any"
                            id="latitud"
                            name="latitud"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Longitud */}
                    <div>
                        <label htmlFor="longitud" className="block text-sm font-medium text-gray-600 mb-1">
                            Longitud
                        </label>
                        <input
                            type="number"
                            step="any"
                            id="longitud"
                            name="longitud"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Vector */}
                    <div>
                        <label htmlFor="vector" className="block text-sm font-medium text-gray-600 mb-1">
                            Vector *
                        </label>
                        <input
                            type="text"
                            id="vector"
                            name="vector"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Enfermedad */}
                    <div>
                        <label htmlFor="enfermedad" className="block text-sm font-medium text-gray-600 mb-1">
                            Enfermedad *
                        </label>
                        <input
                            type="text"
                            id="enfermedad"
                            name="enfermedad"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Género */}
                    <div>
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-600 mb-1">
                            Género Vector
                        </label>
                        <input
                            type="text"
                            id="genero"
                            name="genero"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>


                    {/* Número */}
                    <div>
                        <label htmlFor="numero" className="block text-sm font-medium text-gray-600 mb-1">
                            Número Vectores
                        </label>
                        <input
                            type="number"
                            id="numero"
                            name="numero"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>
                    
                    {/* Fecha */}
                    <div>
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-600 mb-1">
                            Fecha
                        </label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Guardar Registro
                    </button>
                </div>
            </form>
        </div>
    );
}
