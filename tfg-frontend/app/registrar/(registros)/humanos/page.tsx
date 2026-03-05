'use client';

import { postHumanos } from "@/app/registrar/(registros)/humanos/actions";
import { useState, useActionState, useEffect } from "react";

export default function HumanosForm() {

    const [state, formAction, isPending] = useActionState(postHumanos, null);

    const [municipioCaso, setMunicipioCaso] = useState('');
    const [municipioResidencia, setMunicipioResidencia] = useState('');
    const [municipioDeclarante, setMunicipioDeclarante] = useState('');

    const [mostrarPopUp, setMostrarPopUp] = useState(false);

    useEffect(() => {
        if (state?.success) {
            setMostrarPopUp(true);

            setMunicipioCaso('');
            setMunicipioResidencia('');
            setMunicipioDeclarante('');

            
            const timer = setTimeout(() => {
                setMostrarPopUp(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [state]);


    const isResidenciaDisabled = municipioCaso.length > 0 || municipioDeclarante.length > 0;
    const isDeclaranteDisabled = municipioResidencia.length > 0 || municipioCaso.length > 0;
    const isCasoDisabled = municipioResidencia.length > 0 || municipioDeclarante.length > 0;

    const isAnyMunicipioFilled =
        municipioCaso.length > 0 ||
        municipioResidencia.length > 0 ||
        municipioDeclarante.length > 0;

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
                Caso Humano
            </h1>
            <p className="text-gray-600 mb-8">
                Ingrese los detalles del caso de enfermedad en humano
            </p>

            <form className="space-y-6" action={formAction}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Edad */}
                    <div>
                        <label htmlFor="edad" className="block text-sm font-medium text-gray-600 mb-1">
                            Edad *
                        </label>
                        <input
                            type="number"
                            id="edad"
                            name="edad"
                            min="1"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Sexo */}
                    <div>
                        <label htmlFor="sexo" className="block text-sm font-medium text-gray-600 mb-1">
                            Sexo *
                        </label>
                        <select
                            id="sexo"
                            name="sexo"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        >
                            <option value="" className="text-gray-600">Seleccione...</option>
                            <option value="H" className="text-gray-600">Hombre</option>
                            <option value="M" className="text-gray-600">Mujer</option>
                        </select>
                    </div>

                    {/* Fecha de Inicio de Síntomas */}
                    <div>
                        <label htmlFor="fechaInicioSintomas" className="block text-sm font-medium text-gray-600 mb-1">
                            Fecha Inicio de Síntomas
                        </label>
                        <input
                            type="date"
                            id="fechaInicioSintomas"
                            name="fechaInicioSintomas"
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Municipio Caso */}
                    <div>
                        <label htmlFor="municipioCaso" className="block text-sm font-medium text-gray-600 mb-1">
                            Municipio del Caso (1-52)
                        </label>
                        <input
                            type="number"
                            disabled={isCasoDisabled}
                            id="municipioCaso"
                            name="municipioCaso"
                            min="1"
                            max="52"
                            value={municipioCaso}
                            onChange={(e) => {
                                setMunicipioCaso(e.target.value);
                                if (e.target.value) {
                                    setMunicipioResidencia("");
                                    setMunicipioDeclarante("");
                                }
                            }}
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Municipio Residencia */}
                    <div>
                        <label htmlFor="municipioResidencia" className="block text-sm font-medium text-gray-600 mb-1">
                            Municipio de Residencia (1-52)
                        </label>
                        <input
                            type="number"
                            disabled={isResidenciaDisabled}
                            id="municipioResidencia"
                            name="municipioResidencia"
                            min="1"
                            max="52"
                            value={municipioResidencia}
                            onChange={(e) => {
                                setMunicipioResidencia(e.target.value);
                                if (e.target.value) setMunicipioDeclarante("");
                            }}
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>

                    {/* Municipio Declarante */}
                    <div>
                        <label htmlFor="municipioDeclarante" className="block text-sm font-medium text-gray-600 mb-1">
                            Municipio Declarante (1-52)
                        </label>
                        <input
                            type="number"
                            disabled={isDeclaranteDisabled}
                            id="municipioDeclarante"
                            name="municipioDeclarante"
                            min="1"
                            max="52"
                            value={municipioDeclarante}
                            onChange={(e) => setMunicipioDeclarante(e.target.value)}
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>
                </div>

                {!isAnyMunicipioFilled && (
                    <p className="text-amber-600 text-sm font-medium animate-pulse">
                        * Debe completar al menos un municipio (Caso, Residencia o Declarante).
                    </p>
                )}

                {/* Booleans Row */}
                <div className="flex flex-col sm:flex-row gap-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            id="defuncion"
                            name="defuncion"
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:outline-teal-200"
                        />
                        <span className="text-gray-600 font-medium">Hubo defunción</span>
                    </label>

                    <label className="flex items-center space-x-3 cursor-pointer">
                        <input
                            type="checkbox"
                            id="casoHospitalizado"
                            name="casoHospitalizado"
                            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:outline-teal-200"
                        />
                        <span className="text-gray-600 font-medium">Caso Hospitalizado</span>
                    </label>
                </div>

                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={!isAnyMunicipioFilled}
                        className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                        Guardar Registro
                    </button>
                </div>
            </form>
        </div>
    );
}
