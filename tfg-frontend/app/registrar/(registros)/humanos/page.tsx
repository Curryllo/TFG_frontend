'use client';

import { useState, useMemo } from "react";
import { useRouter } from 'next/navigation';
import { peticionAutenticada } from '@/services/api';
import Select from 'react-select';
import countries from "i18n-iso-countries";
import esLocale from "i18n-iso-countries/langs/es.json";
import { revalidarMapas, revalidarGraficos } from '@/app/registrar/actions';

// 1. Registramos el idioma para los países
countries.registerLocale(esLocale);

export default function HumanosForm() {
    const router = useRouter();
    const [estado, setEstado] = useState({ cargando: false, error: "" });
    const [mostrarPopUp, setMostrarPopUp] = useState(false);

    // 2. Estado para almacenar el valor del react-select
    const [paisSeleccionado, setPaisSeleccionado] = useState<{value: string, label: string} | null>(null);

    // 3. Generamos la lista de países para el buscador
    const opcionesPaises = useMemo(() => {
        const paisesObj = countries.getNames("es", { select: "official" });
        return Object.entries(paisesObj)
            .map(([codigo, nombre]) => ({
                value: codigo, 
                label: nombre  
            }))
            .sort((a, b) => a.label.localeCompare(b.label));
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setEstado({ cargando: true, error: "" });

        const formData = new FormData(e.currentTarget);

        // Como usamos un input oculto para el país, esto recogerá su valor perfectamente
        const datosHumanos = {
            edad: Number(formData.get('edad')),
            sexo: formData.get('sexo'),
            fechaCaso: formData.get('fechaCaso'),
            enfermedad: formData.get('enfermedad'),
            pais: formData.get('pais'), // <--- Recogerá el valor del input hidden
            provinciaResidencia: formData.get('provinciaResidencia'),
            municipioResidencia: formData.get('municipioResidencia'),
            defuncion: formData.get('defuncion') === 'on',
            casoHospitalizado: formData.get('casoHospitalizado') === 'on',
        };

        try {
            const response = await peticionAutenticada('/formHumanos', {
                method: 'POST',
                body: JSON.stringify(datosHumanos)
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

            <form className="space-y-6" onSubmit={handleSubmit}>
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

                    {/* Fecha del Caso */}
                    <div>
                        <label htmlFor="fechaCaso" className="block text-sm font-medium text-gray-600 mb-1">
                            Fecha del Caso *
                        </label>
                        <input
                            type="date"
                            id="fechaCaso"
                            name="fechaCaso"
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
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        >
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

                    {/* === PAÍS DE INFECCIÓN CON BUSCADOR === */}
                    <div>
                        <label htmlFor="pais-select" className="block text-sm font-medium text-gray-600 mb-1">
                            País de Infección *
                        </label>
                        <Select
                            inputId="pais-select"
                            options={opcionesPaises}
                            value={paisSeleccionado}
                            onChange={(opcion) => setPaisSeleccionado(opcion)}
                            placeholder="Escribe para buscar..."
                            isSearchable={true}
                            noOptionsMessage={() => "No se encontró ningún país"}
                            className="w-full text-gray-600 font-medium focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                            styles={{
                                control: (base, state) => ({
                                    ...base,
                                    borderColor: state.isFocused ? '#99f6e4' : '#d1d5db',
                                    boxShadow: state.isFocused ? '0 0 0 2px #99f6e4' : 'none',
                                    borderRadius: '0.5rem',
                                    padding: '2px',
                                    '&:hover': { borderColor: '#9ca3af' }
                                }),
                                menu: (base) => ({ ...base, zIndex: 50 }) // Para que el desplegable pase por encima de otros campos
                            }}
                        />
                        {/* INPUT OCULTO: Este es el que lee tu FormData en el handleSubmit */}
                        {/* Nota: Envía el nombre del país en español. Si prefieres enviar el código ISO (ESP), cambia .label por .value */}
                        <input 
                            type="hidden" 
                            name="pais" 
                            value={paisSeleccionado ? paisSeleccionado.label : ''} 
                            required 
                        />
                    </div>

                    {/* Provincia de Residencia */}
                    <div>
                        <label htmlFor="provinciaResidencia" className="block text-sm font-medium text-gray-600 mb-1">
                            Provincia de Residencia del Paciente *
                        </label>
                        <select
                            id="provinciaResidencia"
                            name="provinciaResidencia"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        >
                            <option value="Z" className="text-gray-600">Zaragoza</option>
                            <option value="H" className="text-gray-600">Huesca</option>
                            <option value="T" className="text-gray-600">Teruel</option>
                        </select>
                    </div>

                    {/* Municipio de Residencia */}
                    <div>
                        <label htmlFor="municipioResidencia" className="block text-sm font-medium text-gray-600 mb-1">
                            Municipio de Residencia del Paciente *
                        </label>
                        <input
                            type="text"
                            id="municipioResidencia"
                            name="municipioResidencia"
                            placeholder="Zaragoza"
                            required
                            className="w-full px-4 py-2 text-gray-600 font-medium border border-gray-300 rounded-lg focus:outline-2 focus:outline-offset-2 focus:outline-solid focus:outline-teal-200 transition-colors"
                        />
                    </div>
                </div>

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
                    <button type="submit" disabled={estado.cargando} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50">
                        {estado.cargando ? 'Enviando...' : 'Guardar Registro'}
                    </button>
                </div>
                {estado.error && <p className="text-red-500 text-right">{estado.error}</p>}
            </form>
        </div>
    );
}