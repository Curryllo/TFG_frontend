'use client'

import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { getDatosHumanos } from "@/app/(main)/visualizar/actions";

const ChartRelacionAñoSexoCasos = () => {
    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);
    const [enfermedades, setEnfermedades] = useState<string[]>([]);
    const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState<string>('Todas');

    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Distribución de casos según sexo y año de inicio de síntomas",
        },
        data: [],
        series: [
            {
                type: "line",
                xKey: "año",
                yKey: "ambos",
                yName: "Ambos",
            },
            {
                type: "line",
                xKey: "año",
                yKey: "hombres",
                yName: "Hombres",
            },
            {
                type: "line",
                xKey: "año",
                yKey: "mujeres",
                yName: "Mujeres",
            },
        ],
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosHumanos();

                if (respuesta.success && respuesta.data) {
                    setDatosCrudos(respuesta.data);
                    
                    const enfUnicas = Array.from(new Set(respuesta.data.map((d: any) => d.enfermedad)));
                    setEnfermedades(['Todas', ...(enfUnicas as string[])]);
                } else {
                    console.warn("No se pudieron cargar los datos.", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        cargarDatos();
    }, []);

    useEffect(() => {
        if (datosCrudos.length === 0) return;

        
        const datosFiltrados = enfermedadSeleccionada === 'Todas' 
            ? datosCrudos 
            : datosCrudos.filter(item => item.enfermedad === enfermedadSeleccionada);

        const datosAgrupados: Record<string, { año: string, hombres: number, mujeres: number, ambos: number }> = {};

        datosFiltrados.forEach(item => {
            const año = item.fechacaso ? item.fechacaso.substring(0, 4) : 'Desconocido';
            
            if (año === 'Desconocido' || año === '') return; // Ignorar casos sin fecha

            if (!datosAgrupados[año]) {
                datosAgrupados[año] = { año: año, hombres: 0, mujeres: 0, ambos: 0 };
            }

            datosAgrupados[año].ambos += 1;

            if (item.sexo === 'H') {
                datosAgrupados[año].hombres += 1;
            } else if (item.sexo === 'M') {
                datosAgrupados[año].mujeres += 1;
            }
        });

        const chartData = Object.values(datosAgrupados).sort((a, b) => a.año.localeCompare(b.año));

        setOptions(opcionesPrevias => ({
            ...opcionesPrevias,
            data: chartData
        }));

    }, [datosCrudos, enfermedadSeleccionada]);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
            <div style={{ marginBottom: '1rem' }}>
                <label className="font-semibold text-gray-700">Filtrar por enfermedad: </label>
                <select 
                    className="p-2 border border-gray-300 rounded-lg outline-none bg-white text-gray-800"
                    value={enfermedadSeleccionada} 
                    onChange={(e) => setEnfermedadSeleccionada(e.target.value)}
                >
                    {enfermedades.map(enf => (
                        <option key={enf} value={enf}>{enf}</option>
                    ))}
                </select>
            </div>

            <AgCharts options={options} />
        </div>
    );
};

export default ChartRelacionAñoSexoCasos;