'use client'

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getDatosMontireo, getDatosHumanos, getDatosGarrapatas } from "@/app/visualizar/graficos/action";
import { AgCharts } from "ag-charts-react";
import { useState, useEffect } from "react";
import { AgChartOptions } from "ag-charts-community";
import ChartGravedadEdad from "@/components/ChartBarrasEdadCasos";
import ChartRelacionAñoSexoCasos from "@/components/ChartRelacionAñoSexoCasos";
import ChartPaisesBarrasCasos from "@/components/ChartPaisesBarrasCasos";
import ChartOrigenPieCasos from "@/components/ChartOrigenPieCasos";
import ChartBarrasEdadPorEnfermedad from '@/components/ChartBarrasEdadCasosPorEnfermedad';
import {
    BarSeriesModule,
    CategoryAxisModule,
    LegendModule,
    ModuleRegistry,
    NumberAxisModule,
    PieSeriesModule,
    LineSeriesModule
} from "ag-charts-community";

ModuleRegistry.registerModules([BarSeriesModule, CategoryAxisModule, LegendModule, NumberAxisModule, PieSeriesModule, LineSeriesModule]);




const ChartOrigenPieHumanos = () => {
    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);
    const [enfermedades, setEnfermedades] = useState<string[]>([]);
    const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState<string>('Todas');


    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Origen de los casos registrados",
        },
        subtitle: {
            text: "Autóctonos (España) vs Importados",
        },
        data: [],
        series: [
            {
                type: "pie",
                angleKey: "numero",
                legendItemKey: "origen",
            },
        ],
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosHumanos();

                if (respuesta.success && respuesta.data) {
                    setDatosCrudos(respuesta.data);

                    const listaEnfermedades = respuesta.data.map((caso: any) => caso.enfermedad || 'Desconocida');
                    const enfermedadesUnicas = Array.from(new Set(listaEnfermedades)) as string[];
                    setEnfermedades(enfermedadesUnicas);

                    console.log("Enfermedades cargadas de forma única:", enfermedadesUnicas);

                } else {
                    console.warn("No se pudieron cargar los datos de monitoreo o la respuesta no fue exitosa.", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar los datos de monitoreo:", error);
            }
        };

        cargarDatos();
    }, []);

    useEffect(() => {
        if (datosCrudos.length === 0) return;

        const datosFiltrados = enfermedadSeleccionada === 'Todas'
            ? datosCrudos
            : datosCrudos.filter(caso => (caso.enfermedad || 'Desconocida') === enfermedadSeleccionada);

        const conteoOrigen = datosFiltrados.reduce((acumulador: any, caso: any) => {
            // Limpiamos espacios y verificamos si es España
            const paisLimpio = caso.pais ? caso.pais.trim() : "";
            const categoria = paisLimpio === "España" ? "Autóctono" : "Importado";

            // Sumamos al contador de esa categoría
            acumulador[categoria] = (acumulador[categoria] || 0) + 1;

            return acumulador;
        }, {});


        const datosParaGrafica = Object.keys(conteoOrigen).map(clave => ({
            origen: clave,
            numero: conteoOrigen[clave]
        }));

        setOptions((opcionesPrevias) => ({
            ...opcionesPrevias,
            data: datosParaGrafica
        }));

    }, [datosCrudos, enfermedadSeleccionada]);

    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="px-4 pt-4 flex items-center gap-3">
                <label htmlFor="selector-enfermedad" className="font-semibold text-gray-700">
                    Filtrar por enfermedad:
                </label>
                <select
                    id="selector-enfermedad"
                    value={enfermedadSeleccionada}
                    onChange={(e) => setEnfermedadSeleccionada(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-800"
                >
                    <option value="Todas">Todas las enfermedades</option>
                    {enfermedades.map((enf) => (
                        <option key={enf} value={enf}>
                            {enf}
                        </option>
                    ))}
                </select>
            </div>
            <AgCharts options={options} />
        </div>
    );
};


const ChartFechasBarraMonitoreo = () => {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Muestras obtenidas por fecha",
        },
        subtitle: {
            text: " ",
        },
        data: [],
        series: [
            {
                type: "bar",
                xKey: "fecha",
                yKey: "numero",
                yName: "Número de casos",
            },
        ],
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosMontireo();

                // Comprobamos si la respuesta fue exitosa y tiene datos
                if (respuesta.success && respuesta.data) {
                    // Actualizamos el estado solo con la propiedad data
                    setOptions((opcionesPrevias) => ({
                        ...opcionesPrevias,
                        data: respuesta.data, // <-- Pasamos el array real aquí
                    }));
                    console.log("Datos cargados para el gráfico:", respuesta.data);
                } else {
                    console.warn("No se pudieron cargar los datos de monitoreo o la respuesta no fue exitosa.", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar los datos de monitoreo:", error);
            }
        };

        cargarDatos();
    }, []);

    return <AgCharts options={options} />;
};

const ChartVectoresPieMonitoreo = () => {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Muestras obtenidas por vectores",
        },
        subtitle: {
            text: " ",
        },
        data: [],
        series: [
            {
                type: "pie",
                angleKey: "numero",
                legendItemKey: "vector",
            },
        ],
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosMontireo();

                if (respuesta.success && respuesta.data) {
                    setOptions((opcionesPrevias) => ({
                        ...opcionesPrevias,
                        data: respuesta.data, // <-- Pasamos el array real aquí
                    }));
                    console.log("Datos cargados para el gráfico pie de vectores:", respuesta.data);
                } else {
                    console.warn("No se pudieron cargar los datos de monitoreo o la respuesta no fue exitosa.", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar los datos de monitoreo:", error);
            }
        };

        cargarDatos();
    }, []);

    return <AgCharts options={options} />;
};


const ChartFechaBarrasGarrapatas = () => {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Garrapatas recogidas por fecha",
        },
        subtitle: {
            text: " ",
        },
        data: [],
        series: [
            {
                type: "bar",
                xKey: "fecha",
                yKey: "numero",
                yName: "Número de casos",
            },
        ],
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosGarrapatas();

                if (respuesta.success && respuesta.data) {
                    const conteoPorFecha = respuesta.data.reduce((acumulador: any, caso: any) => {
                        // Pillamos el nombre de la enfermedad (si viene vacío, le ponemos 'Desconocida')
                        const fecha = caso.fechaRecogida || null;

                        // Si ya la hemos visto, le sumamos 1. Si es la primera vez, la empezamos en 1.
                        acumulador[fecha] = (acumulador[fecha] || 0) + 1;

                        return acumulador;
                    }, {});

                    const datosParaGrafica = Object.keys(conteoPorFecha).map(clave => ({
                        fecha: clave,
                        numero: conteoPorFecha[clave]
                    }));

                    setOptions((opcionesPrevias) => ({
                        ...opcionesPrevias,
                        data: datosParaGrafica,
                    }));
                    console.log("Datos cargados para el gráfico de barras de casos:", datosParaGrafica);
                } else {
                    console.warn("No se pudieron cargar los datos de garrapatas o la respuesta no fue exitosa.", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar los datos de garrapatas:", error);
            }
        };

        cargarDatos();
    }, []);

    return <AgCharts options={options} />;
};

const ChartGarrapatasPie = () => {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Garrapatas recogidas por especie",
        },
        subtitle: {
            text: " ",
        },
        data: [],
        series: [
            {
                type: "pie",
                angleKey: "numero",
                legendItemKey: "especie",
            },
        ],
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosGarrapatas();

                if (respuesta.success && respuesta.data) {
                    const conteoPorEspecie = respuesta.data.reduce((acumulador: any, caso: any) => {
                        const nombreEspecie = caso.especie || 'Desconocida';

                        acumulador[nombreEspecie] = (acumulador[nombreEspecie] || 0) + 1;

                        return acumulador;
                    }, {});

                    const datosParaGrafica = Object.keys(conteoPorEspecie).map(clave => ({
                        especie: clave,
                        numero: conteoPorEspecie[clave]
                    }));

                    setOptions((opcionesPrevias) => ({
                        ...opcionesPrevias,
                        data: datosParaGrafica,
                    }));
                    console.log("Datos cargados para el gráfico:", datosParaGrafica);
                } else {
                    console.warn("No se pudieron cargar los datos de garrapatas o la respuesta no fue exitosa.", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar los datos de garrapatas:", error);
            }
        };

        cargarDatos();
    }, []);

    return <AgCharts options={options} />;
};


export default function VisualizacionGraficos() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="max-w-6xl w-full">
                <Link href="/visualizar" className="block">
                    <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        Volver atrás
                    </div>
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Gráficos</h1>
                <p className="text-gray-600 mb-2">Análisis gráfico de los datos de enfermedades vectoriales</p>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-2">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Análisis de Casos Humanos</h2>
                    </div>
                    <div className="p-4 border-b w-full">
                        <h3 className="text-lg font-bold text-gray-900">Número de casos por países</h3>
                        <ChartPaisesBarrasCasos />
                        <h3 className="text-lg font-bold text-gray-900">Origen de los casos</h3>
                        <ChartOrigenPieCasos />
                        <h3 className="text-lg font-bold text-gray-900">Grupos de edad</h3>
                        <ChartGravedadEdad />
                        <ChartBarrasEdadPorEnfermedad />
                        <h3 className="text-lg font-bold text-gray-900">Relación Año-Sexo</h3>
                        <ChartRelacionAñoSexoCasos />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden mb-2">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Análisis de Monitoreo Entomológico</h2>
                    </div>
                    <div className="w-full">
                        <ChartFechasBarraMonitoreo />
                        <ChartVectoresPieMonitoreo />
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-900">Análisis de Casos Animales</h2>
                    </div>
                    <div className="w-full">
                        <ChartFechaBarrasGarrapatas />
                        <ChartGarrapatasPie />
                    </div>
                </div>
            </div>
            {/*
            <button onClick={async () => {
                const data = await obtenerBoundary(new FormData());
                console.log("VALOR REAL:", JSON.parse(JSON.stringify(data)));
            }} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Obtener Bites
            </button>
             */}
        </div>
    );
}