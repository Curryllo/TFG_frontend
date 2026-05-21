'use client'

import { useState, useEffect, useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

const ChartBarrasEdadCasos = ({ data }: { data: any[] }) => {
    
    
    const [options, setOptions] = useState<any>({
        title: { text: "Casos de enfermedades por grupos de edad" },
        subtitle: { text: " " },
        data: [],
        series: [],
        axes: [
            { type: "category", position: "bottom", title: { text: "Rango de Edad" } },
            { type: "number", position: "left", title: { text: "Número de Casos" } }
        ]
    });

    
    useEffect(() => {
        if (data.length === 0) return;

        
        const listaEnfermedades = data.map(caso => caso.enfermedad ? caso.enfermedad.trim() : 'Desconocida');
        const enfermedadesUnicas = Array.from(new Set(listaEnfermedades)) as string[];

        
        const agrupacionEdades: Record<string, any> = {
            "0-14": { rango: "0-14", orden: 1 },
            "15-24": { rango: "15-24", orden: 2 },
            "25-34": { rango: "25-34", orden: 3 },
            "35-44": { rango: "35-44", orden: 4 },
            "45-54": { rango: "45-54", orden: 5 },
            "55-64": { rango: "55-64", orden: 6 }, 
            "65+": { rango: "65+", orden: 7 },
        };

    
        Object.values(agrupacionEdades).forEach(cajon => {
            enfermedadesUnicas.forEach(enf => {
                cajon[enf] = 0;
            });
        });

        
        data.forEach(caso => {
            let claveRango = "65+";
            if (caso.edad <= 14) claveRango = "0-14";
            else if (caso.edad <= 24) claveRango = "15-24";
            else if (caso.edad <= 34) claveRango = "25-34";
            else if (caso.edad <= 44) claveRango = "35-44";
            else if (caso.edad <= 54) claveRango = "45-54";
            else if (caso.edad <= 64) claveRango = "55-64";

            const enfermedad = caso.enfermedad ? caso.enfermedad.trim() : 'Desconocida';

            agrupacionEdades[claveRango][enfermedad] += 1;
        });

        const datosParaGrafica = Object.values(agrupacionEdades).sort((a: any, b: any) => a.orden - b.orden);

        const seriesDinamicas = enfermedadesUnicas.map((enf) => ({
            type: "bar" as const,
            xKey: "rango",
            yKey: enf,
            yName: enf,
            stacked: true,
            strokeWidth: 0
        }));

        setOptions((opcionesPrevias: any) => ({
            ...opcionesPrevias,
            data: datosParaGrafica,
            series: seriesDinamicas
        }));

    }, [data]);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
            <div style={{ height: '400px' }}>
                <AgCharts options={options} />
            </div>
        </div>
    );
};

export default ChartBarrasEdadCasos;