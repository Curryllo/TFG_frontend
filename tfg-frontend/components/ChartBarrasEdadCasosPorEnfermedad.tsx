'use client'

import { useState, useEffect, useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

const ChartBarrasEdadPorEnfermedad = ({ data }: { data: any[] }) => {
    const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState<string>("Todas");

    const enfermedades = useMemo(() => {
        if (!data) return [];
        const listaEnfermedades = data.map((caso: any) => caso.enfermedad ? caso.enfermedad.trim() : 'Desconocida');
        return Array.from(new Set(listaEnfermedades)) as string[];
    }, [data]);

    const [options, setOptions] = useState<AgChartOptions>({
        title: { text: "Distribución por Edad" },
        data: [],
        series: [
            {
                type: "bar",
                xKey: "rango",
                yKey: "cantidad",
                yName: "Casos"
            }
        ],
        axes: [
            { type: "category", position: "bottom", title: { text: "Rango de Edad" } },
            { type: "number", position: "left", title: { text: "Número de Casos" } }
        ]
    } as unknown as AgChartOptions);

    useEffect(() => {
        if (data.length === 0 || !enfermedadSeleccionada) return;

        const casosFiltrados = enfermedadSeleccionada === "Todas"
            ? data
            : data.filter(caso =>
                (caso.enfermedad?.trim() || 'Desconocida') === enfermedadSeleccionada
            );

        const agrupacionEdades: Record<string, any> = {
            "0-14": { rango: "0-14", cantidad: 0, orden: 1 },
            "15-24": { rango: "15-24", cantidad: 0, orden: 2 },
            "25-34": { rango: "25-34", cantidad: 0, orden: 3 },
            "35-44": { rango: "35-44", cantidad: 0, orden: 4 },
            "45-54": { rango: "45-54", cantidad: 0, orden: 5 },
            "55-64": { rango: "55-64", cantidad: 0, orden: 6 },
            "65+": { rango: "65+", cantidad: 0, orden: 7 },
        };

        casosFiltrados.forEach(caso => {
            if (caso.edad === null || caso.edad === undefined) return;
            
            let claveRango = "65+"; 
            if (caso.edad <= 14) claveRango = "0-14";
            else if (caso.edad <= 24) claveRango = "15-24";
            else if (caso.edad <= 34) claveRango = "25-34";
            else if (caso.edad <= 44) claveRango = "35-44";
            else if (caso.edad <= 54) claveRango = "45-54";
            else if (caso.edad <= 64) claveRango = "55-64";

            agrupacionEdades[claveRango].cantidad += 1;
        });

        const datosFinales = Object.values(agrupacionEdades).sort((a: any, b: any) => a.orden - b.orden);

        setOptions(prev => ({
            ...prev,
            data: datosFinales,
            title: {
                text: enfermedadSeleccionada === 'Todas'
                    ? "Casos totales registrados por edad"
                    : `Casos de ${enfermedadSeleccionada.trim()} por edad`
            }
        }));

    }, [enfermedadSeleccionada, data]);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
            <div className="flex flex-col gap-2 max-w-xs">
                <label className="font-semibold text-gray-700">Filtrar por enfermedad:</label>
                <select
                    id="selector-enfermedad"
                    value={enfermedadSeleccionada}
                    onChange={(e) => setEnfermedadSeleccionada(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-800"
                >
                    <option value="Todas">Todas las enfermedades</option>
                    {enfermedades.map(enf => (
                        <option key={enf} value={enf}>{enf}</option>
                    ))}
                </select>
            </div>

            <div style={{ height: '400px' }}>
                <AgCharts options={options} />
            </div>
        </div>
    );
};

export default ChartBarrasEdadPorEnfermedad;