'use client';

import { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { getDatosGarrapatas } from "@/app/visualizar/actions";

const MESES = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];

const ChartBarrasFechaGarrapatas = () => {
    const [datosProcesados, setDatosProcesados] = useState<any[]>([]);

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosGarrapatas();
                if (respuesta.success && respuesta.data) {
                    const agrupados = respuesta.data.reduce((acc: any, caso: any) => {
                        if (!caso.fechaRecogida) return acc;

                        const fecha = new Date(caso.fechaRecogida);
                        const clave = `${fecha.getFullYear()}-${String(fecha.getMonth() + 1).padStart(2, '0')}`;
                        const etiqueta = `${MESES[fecha.getMonth()]} ${fecha.getFullYear()}`;

                        if (!acc[clave]) acc[clave] = { clave, mes: etiqueta, cantidad: 0 };
                        acc[clave].cantidad += 1;

                        return acc;
                    }, {});

                    // Ordenamos cronológicamente por la clave YYYY-MM
                    const datosFinales = Object.values(agrupados)
                        .sort((a: any, b: any) => a.clave.localeCompare(b.clave));

                    setDatosProcesados(datosFinales);
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };
        cargarDatos();
    }, []);

    const chartOptions: AgChartOptions = {
        title: { text: "Garrapatas recogidas por mes" },
        data: datosProcesados,
        axes: [
            { type: "category", position: "bottom", title: { text: "Mes" } },
            { type: "number", position: "left", title: { text: "Nº de recogidas" } }
        ],
        series: [
            {
                type: "bar",
                xKey: "mes",
                yKey: "cantidad",
                yName: "Garrapatas recogidas",
                fill: "#14b8a6",
                strokeWidth: 0
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

export default ChartBarrasFechaGarrapatas;