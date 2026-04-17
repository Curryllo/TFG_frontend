'use client'

import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { getDatosHumanos } from "@/app/visualizar/graficos/action";

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
                yKey: "ambos", // <-- Clave única para el total
                yName: "Ambos",
            },
            {
                type: "line",
                xKey: "año",
                yKey: "hombres", // <-- Clave única para hombres
                yName: "Hombres",
            },
            {
                type: "line",
                xKey: "año",
                yKey: "mujeres", // <-- Clave única para mujeres
                yName: "Mujeres",
            },
        ],
    });

    // 1. Efecto para cargar los datos crudos UNA sola vez al montar el componente
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosHumanos();

                if (respuesta.success && respuesta.data) {
                    setDatosCrudos(respuesta.data);
                    
                    // Opcional: Extraer enfermedades únicas para un futuro desplegable (Select)
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

    // 2. Efecto para procesar los datos cada vez que cambian los datos crudos o el filtro
    useEffect(() => {
        if (datosCrudos.length === 0) return;

        // Filtrar por enfermedad si es necesario
        const datosFiltrados = enfermedadSeleccionada === 'Todas' 
            ? datosCrudos 
            : datosCrudos.filter(item => item.enfermedad === enfermedadSeleccionada);

        // Agrupar y contar por año y sexo
        const datosAgrupados: Record<string, { año: string, hombres: number, mujeres: number, ambos: number }> = {};

        datosFiltrados.forEach(item => {
            // Extraer solo el año de "YYYY-MM-DD"
            const año = item.fechacaso ? item.fechacaso.substring(0, 4) : 'Desconocido';
            
            if (año === 'Desconocido' || año === '') return; // Ignorar casos sin fecha

            if (!datosAgrupados[año]) {
                datosAgrupados[año] = { año: año, hombres: 0, mujeres: 0, ambos: 0 };
            }

            // Sumar al total
            datosAgrupados[año].ambos += 1;

            // Sumar por sexo
            if (item.sexo === 'H') {
                datosAgrupados[año].hombres += 1;
            } else if (item.sexo === 'M') {
                datosAgrupados[año].mujeres += 1;
            }
        });

        // Convertir el objeto a un array y ordenarlo por año de menor a mayor
        const chartData = Object.values(datosAgrupados).sort((a, b) => a.año.localeCompare(b.año));

        // Actualizar el gráfico
        setOptions(opcionesPrevias => ({
            ...opcionesPrevias,
            data: chartData
        }));

    }, [datosCrudos, enfermedadSeleccionada]);

    return (
        <div>
            {/* Opcional: Un selector básico para probar el filtro de enfermedades */}
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