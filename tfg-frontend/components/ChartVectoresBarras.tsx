'use client';

import { useState, useEffect } from 'react';
import { getDatosMontireo } from "@/app/visualizar/actions";
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

const ChartVectoresBarras = () => {
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
                type: "bar",
                xKey: "vector",
                yKey: "numero",
                yName: "Número de muestras",
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
                        data: respuesta.data,
                    }));
                    console.log("Datos cargados para el gráfico barras de vectores:", respuesta.data);
                } else {
                    console.warn("No se pudieron cargar los datos de monitoreo o la respuesta no fue exitosa.", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar los datos de monitoreo:", error);
            }
        };

        cargarDatos();
    }, []);

    return <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2"><AgCharts options={options} /></div>;
};

export default ChartVectoresBarras;