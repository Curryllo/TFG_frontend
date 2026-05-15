'use client';

import { useState, useActionState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { peticionAutenticada } from '@/services/api';
import { revalidarMapas, revalidarGraficos } from '@/app/(main)/registrar/actions';
import DropZone from "@/components/DropZone";

export default function AnimalesForm() {

    const [mostrarPopUp, setMostrarPopUp] = useState(false);

    const [estado, setEstado] = useState({ cargando: false, error: "" });

    const [tieneAnimal, setTieneAnimal] = useState(false);
    const [tieneHumano, setTieneHumano] = useState(false);


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEstado({ cargando: true, error: "" });

        const formData = new FormData(e.currentTarget);

        const datosGarrapatas = {
            municipio: formData.get('municipio'),
            especie: formData.get('especie'),
            fecha: formData.get('fechaRecogida'),
            enHumano: formData.get('enHumano') === 'on',
            animal: formData.get('enAnimal') ?? ''
        };

        try {
            const response = await peticionAutenticada('/formGarrapatas', {
                method: 'POST',
                body: JSON.stringify(datosGarrapatas)
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

    return (
        <div className="max-w-4xl my-auto">
            <div>
                <DropZone tipo="garrapatas" />
            </div>
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
                    Garrapatas
                </h1>
                <p className="text-gray-600 mb-8">
                    Ingrese los detalles de la garrapata que desea registrar
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-row gap-6">
                        <div>
                            <label htmlFor="municipio" className="block text-sm font-medium text-gray-600 mb-1">
                                Municipio *
                            </label>
                            <input
                                type="text"
                                id="municipio"
                                name="municipio"
                                required
                                placeholder="Zaragoza"
                                className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                            />
                        </div>

                        <div>
                            <label htmlFor="fechaRecogida" className="block text-sm font-medium text-gray-600 mb-1">
                                Fecha de recogida *
                            </label>
                            <input
                                type="date"
                                id="fechaRecogida"
                                name="fechaRecogida"
                                required
                                className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="especie" className="block text-sm font-medium text-gray-600 mb-1">
                            Especie de la garrapata *
                        </label>
                        <select
                            id="especie"
                            name="especie"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        >
                            <option value="marginatus" className="text-gray-600">Dermacentor marginatus</option>
                            <option value="reticulatus" className="text-gray-600">Dermacentor reticulatus</option>
                            <option value="punctata" className="text-gray-600">Haemaphysalis punctata</option>
                            <option value="spp" className="text-gray-600">Haemaphysalis spp.</option>
                            <option value="hyalomma" className="text-gray-600">Hyalomma spp.</option>
                            <option value="ixodes" className="text-gray-600">Ixodes ricinus</option>
                            <option value="bursa" className="text-gray-600">Rhipicephalus bursa</option>
                            <option value="sanguineus" className="text-gray-600">Rhipicephalus sanguineus</option>
                            <option value="rhipicepahulsSpp" className="text-gray-600">Rhipicephalus spp.</option>
                            <option value="otra" className="text-gray-600">Otra</option>
                        </select>
                    </div>


                    <p className="text-amber-600 text-sm font-medium animate-pulse">
                        * Debe marcar donde se ha encontrado la garrapata.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        <div>
                            <label className="block text-sm font-medium text-gray-600 mb-1">
                                Garrapata encontrada en:
                            </label>
                        </div>

                        <div className="flex flex-col gap-4 sm:w-2/3">
                            <div className="flex items-center">
                                <label className="flex items-center space-x-3 cursor-pointer">
                                    <span className="text-gray-600 font-medium">Humano</span>
                                    <input
                                        type="checkbox"
                                        id="enHumano"
                                        name="enHumano"
                                        disabled={tieneAnimal}
                                        checked={tieneHumano}
                                        onChange={(e) => setTieneHumano(e.target.checked)}
                                        className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:outline-teal-200"
                                    />
                                </label>
                            </div>

                            <div className="flex items-center">
                                <label htmlFor="enAnimal" className="text-gray-600 font-medium mx-2">
                                    Animal
                                </label>
                                <select
                                    id="enAnimal"
                                    name="enAnimal"
                                    disabled={tieneHumano}
                                    onChange={(e) => setTieneAnimal(e.target.value !== '')}
                                    className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                                >
                                    <option value="">Ninguno</option>
                                    <option value="Cabra Montés" className="text-gray-600">Cabra Montés</option>
                                    <option value="Ciervo" className="text-gray-600">Ciervo</option>
                                    <option value="Corzo" className="text-gray-600">Corzo</option>
                                    <option value="Gamo" className="text-gray-600">Gamo</option>
                                    <option value="Otro" className="text-gray-600">Otro</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="pt-4 flex justify-end">
                        <button type="submit" disabled={estado.cargando} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                            {estado.cargando ? 'Enviando...' : 'Guardar Registro'}
                        </button>
                        {estado.error && <p className="text-red-500">{estado.error}</p>}
                    </div>
                </form >
            </div >
        </div>
        );
}
