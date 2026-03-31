'use client';

import { postGarrapatas } from "@/app/registrar/(registros)/garrapatas/actions";
import { useState, useActionState, useEffect } from "react";

export default function AnimalesForm() {
    const [state, formAction, isPending] = useActionState(postGarrapatas, null);

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Garrapatas
            </h1>
            <p className="text-gray-600 mb-8">
                Ingrese los detalles de la garrapata que desea registrar
            </p>

            <form className="space-y-4" action={formAction}>
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
                                className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                            >
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
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Guardar Registro
                    </button>
                </div>
            </form >
        </div >
    );
}
