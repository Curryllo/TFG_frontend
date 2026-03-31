'use client'

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getDatosMontireo, getDatosHumanos, getDatosGarrapatas } from "@/app/visualizar/graficos/action";
import { AgCharts } from "ag-charts-react";
import { useState, useEffect } from "react";
import { AgChartOptions } from "ag-charts-community";
import {
    BarSeriesModule,
    CategoryAxisModule,
    LegendModule,
    ModuleRegistry,
    NumberAxisModule,
    PieSeriesModule
} from "ag-charts-community";

ModuleRegistry.registerModules([BarSeriesModule, CategoryAxisModule, LegendModule, NumberAxisModule, PieSeriesModule]);

const ChartFechaBarrasHumanos = () => {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Casos registrados por fecha",
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
                const respuesta = await getDatosHumanos();

                if (respuesta.success && respuesta.data) {
                    const conteoPorFecha = respuesta.data.reduce((acumulador: any, caso: any) => {
                        // Pillamos el nombre de la enfermedad (si viene vacío, le ponemos 'Desconocida')
                        const fecha = caso.fechacaso || null;

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

const ChartCasosPieHumanos = () => {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Casos registrados por enfermedad",
        },
        subtitle: {
            text: " ",
        },
        data: [],
        series: [
            {
                type: "pie",
                angleKey: "numero",
                legendItemKey: "enfermedad",
            },
        ],
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosHumanos();

                if (respuesta.success && respuesta.data) {
                    const conteoPorEnfermedad = respuesta.data.reduce((acumulador: any, caso: any) => {
                        // Pillamos el nombre de la enfermedad (si viene vacío, le ponemos 'Desconocida')
                        const nombreEnfermedad = caso.enfermedad || 'Desconocida';

                        // Si ya la hemos visto, le sumamos 1. Si es la primera vez, la empezamos en 1.
                        acumulador[nombreEnfermedad] = (acumulador[nombreEnfermedad] || 0) + 1;

                        return acumulador;
                    }, {});

                    const datosParaGrafica = Object.keys(conteoPorEnfermedad).map(clave => ({
                        enfermedad: clave,
                        numero: conteoPorEnfermedad[clave]
                    }));

                    setOptions((opcionesPrevias) => ({
                        ...opcionesPrevias,
                        data: datosParaGrafica,
                    }));
                    console.log("Datos cargados para el gráfico:", datosParaGrafica);
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
                    <div className="w-full">
                        <ChartFechaBarrasHumanos />
                        <ChartCasosPieHumanos />
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