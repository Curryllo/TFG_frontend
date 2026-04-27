'use client';

import { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { getDatosGarrapatas } from "@/app/visualizar/actions";

const ChartDonutEspeciesGarrapatas = () => {
    const [datosProcesados, setDatosProcesados] = useState<any[]>([]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosGarrapatas();
                if (respuesta.success && respuesta.data) {
                    const agrupados = respuesta.data.reduce((acc: any, caso: any) => {
                        const especie = caso.especie ? caso.especie.trim() : 'Desconocida';
                        if (!acc[especie]) acc[especie] = { especie, cantidad: 0 };
                        acc[especie].cantidad += 1;
                        return acc;
                    }, {});

                    setDatosProcesados(Object.values(agrupados));
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };
        cargarDatos();
    }, []);

    const chartOptions: AgChartOptions = {
        title: { text: "Especies de garrapatas recogidas" },
        data: datosProcesados,
        series: [
            {
                type: "donut",
                angleKey: "cantidad",
                legendItemKey: "especie",
                innerRadiusRatio: 0.6,
                calloutLabelKey: "especie",
                sectorLabelKey: "cantidad",
                sectorLabel: {
                    color: "white",
                    fontWeight: "bold",
                }
            }
        ]
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
            <div>
                <AgCharts options={chartOptions} />
            </div>
        </div>
    );
};

export default ChartDonutEspeciesGarrapatas;