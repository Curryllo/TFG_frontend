'use client'
import { useState, useActionState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { peticionAutenticada } from '@/services/api';
import { revalidarMapas, revalidarGraficos } from '@/app/(main)/registrar/actions';

export default function MonitoreoForm() {

    const router = useRouter();
    const [estado, setEstado] = useState({ cargando: false, error: "" });
    const [mostrarPopUp, setMostrarPopUp] = useState(false);

    const [lugar, setLugar] = useState('');
    const [latitud, setLatitud] = useState('');
    const [longitud, setLongitud] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEstado({ cargando: true, error: "" });

        const formData = new FormData(e.currentTarget);

        // 1. Preparamos el objeto con los datos del formulario
        const datosMonitoreo = {
            lugarRecogida: formData.get('lugar'),
            latitud: formData.get('latitud') ? Number(formData.get('latitud')) : null,
            longitud: formData.get('longitud') ? Number(formData.get('longitud')) : null,
            vector: formData.get('vector'),
            enfermedad: formData.get('enfermedad'),
            genero: formData.get('genero'),
            fecha: formData.get('fecha'),
            numero: formData.get('numero') ? Number(formData.get('numero')) : null
        };

        try {
            const response = await peticionAutenticada('/formMonitoreo', {
                method: 'POST',
                body: JSON.stringify(datosMonitoreo)
            });

            if (response.ok) {
                setMostrarPopUp(true);
                setTimeout(() => setMostrarPopUp(false), 2000);
                await revalidarMapas();
                await revalidarGraficos();
                setEstado({ cargando: false, error: "" });
            } else {
                setEstado({ cargando: false, error: `Error ${response.status}` });
            }
        } catch (error) {
            setEstado({ cargando: false, error: "Error de conexión" });
        }
    };


    const isAnyLugar = lugar.length > 0 || (latitud.length > 0 && longitud.length > 0);


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
                Vigilancia Entomológica
            </h1>
            <p className="text-gray-600 mb-8">
                Ingrese datos de vigilancia de vectores
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/*<input type="hidden" name="accessToken" value={token || ''} />*/}

                    {/* Lugar */}
                    <div>
                        <label htmlFor="lugar" className="block text-sm font-medium text-gray-600 mb-1">
                            Lugar
                        </label>
                        <input
                            type="text"
                            id="lugar"
                            name="lugar"
                            placeholder="Parque Delicias de Zaragoza"
                            value={lugar}
                            onChange={(e) => {
                                setLugar(e.target.value);
                                if (e.target.value) {
                                    setLatitud('');
                                    setLongitud('');
                                }
                            }}
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
                            placeholder="6472749"
                            value={latitud}
                            onChange={(e) => {
                                setLatitud(e.target.value);
                                if (e.target.value) {
                                    setLugar('');
                                }
                            }}
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
                            placeholder="-0,9116654"
                            value={longitud}
                            onChange={(e) => {
                                setLongitud(e.target.value);
                                if (e.target.value) {
                                    setLugar('');
                                }
                            }}
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
                            placeholder="Aedes albopictus"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Enfermedad */}
                    <div>
                        <label htmlFor="enfermedad" className="block text-sm font-medium text-gray-600 mb-1">
                            Enfermedad *
                        </label>
                        <select
                            id="enfermedad"
                            name="enfermedad"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        >
                            <option value="" className="text-gray-600">Ninguna</option>
                            <option value="Dengue" className="text-gray-600">Dengue</option>
                            <option value="Encefalitis Trasmitida por Garrapatas" className="text-gray-600">Encefalitis Trasmitida por Garrapatas</option>
                            <option value="Enfermedad de Lyme" className="text-gray-600">Enfermedad de Lyme</option>
                            <option value="Enfermedad por virus Chikunguya" className="text-gray-600">Enfermedad por virus Chikunguya</option>
                            <option value="Fiebre amarilla" className="text-gray-600">Fiebre amarilla</option>
                            <option value="Fiebre del Nilo occidental" className="text-gray-600">Fiebre del Nilo occidental</option>
                            <option value="Fiebre exantemática mediterránea" className="text-gray-600">Fiebre exantemática mediterránea</option>
                            <option value="Fiebre recurrente transmitida por garrapatas" className="text-gray-600">Fiebre recurrente transmitida por garrapatas</option>
                            <option value="Fiebre hemorrágicas víricas" className="text-gray-600">Fiebre hemorrágicas víricas</option>
                            <option value="Leishmaniasis" className="text-gray-600">Leishmaniasis</option>
                            <option value="Paludismo" className="text-gray-600">Paludismo</option>
                            <option value="Tularemia" className="text-gray-600">Tularemia</option>
                            <option value="Zika congénito" className="text-gray-600">Zika congénito</option>
                            <option value="Zika" className="text-gray-600">Zika</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="genero" className="block text-sm font-medium text-gray-600 mb-1">
                            Género Vector
                        </label>
                        <select
                            id="genero"
                            name="genero"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        >
                            <option value="" className="text-gray-600">Vacío</option>
                            <option value="H" className="text-gray-600">Hembra</option>
                            <option value="M" className="text-gray-600">Macho</option>
                        </select>
                    </div>


                    {/* Número */}
                    <div>
                        <label htmlFor="numero" className="block text-sm font-medium text-gray-600 mb-1">
                            Número Vectores *
                        </label>
                        <input
                            type="number"
                            id="numero"
                            name="numero"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Fecha */}
                    <div>
                        <label htmlFor="fecha" className="block text-sm font-medium text-gray-600 mb-1">
                            Fecha de Recogida
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

                {!isAnyLugar && (
                    <p className="text-amber-600 text-sm font-medium animate-pulse">
                        * Debe completar Lugar o Latitud y Longitud.
                    </p>
                )}

                {/*
                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={!isAnyLugar}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Guardar Registro
                    </button>
                </div>
                */}
                <div className="pt-4 flex justify-end">
                    <button type="submit" disabled={estado.cargando} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        {estado.cargando ? 'Enviando...' : 'Guardar Registro'}
                    </button>
                    {estado.error && <p className="text-red-500">{estado.error}</p>}
                </div>
            </form>
        </div>
    );
}
