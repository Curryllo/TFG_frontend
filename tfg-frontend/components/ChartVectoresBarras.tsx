'use client';

import { useState, useEffect } from 'react';
import { getDatosMontireo } from "@/app/(main)/visualizar/actions";
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
                console.log("CLIENTE recibe:", respuesta);
                if (respuesta.success && respuesta.data) {
                    // Agrupar por vector sumando el número de muestras
                    const agrupado = respuesta.data.reduce((acc: any, item: any) => {
                        const vector = item.vector.trim();
                        if (!acc[vector]) acc[vector] = { vector, numero: 0 };
                        acc[vector].numero += item.numero;
                        return acc;
                    }, {});

                    setOptions((prev) => ({
                        ...prev,
                        data: Object.values(agrupado),
                    }));
                }
            } catch (error) {
                console.error("Error al cargar los datos de monitoreo:", error);
            }
        };

        cargarDatos();
    }, []);

    return <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2"><AgCharts key={options.data?.length} options={options} /></div>;
};

export default ChartVectoresBarras;