'use client'

import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { getDatosHumanos } from "@/app/visualizar/actions";

const ChartBarrasEdadCasos = () => {
    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);

    // 1. Estado inicial del gráfico (las series y los datos se llenarán luego)
    const [options, setOptions] = useState<AgChartOptions>({
        title: { text: "Casos de enfermedades por grupos de edad" },
        subtitle: { text: " " },
        data: [],
        series: [],
        axes: [
            { type: "category", position: "bottom", title: { text: "Rango de Edad" } },
            { type: "number", position: "left", title: { text: "Número de Casos" } }
        ]
    });

    // 2. Obtener los datos
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosHumanos();
                if (respuesta.success && respuesta.data) {
                    setDatosCrudos(respuesta.data);
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        cargarDatos();
    }, []);

    // 3. Procesar datos y construir las barras dinámicas
    useEffect(() => {
        if (datosCrudos.length === 0) return;

        // a) Obtenemos la lista única de enfermedades presentes en los datos
        const listaEnfermedades = datosCrudos.map(caso => caso.enfermedad ? caso.enfermedad.trim() : 'Desconocida');
        const enfermedadesUnicas = Array.from(new Set(listaEnfermedades)) as string[];

        // b) Preparamos los "cajones" base para las edades (corregido el typo en 55-64)
        const agrupacionEdades: Record<string, any> = {
            "0-14": { rango: "0-14", orden: 1 },
            "15-24": { rango: "15-24", orden: 2 },
            "25-34": { rango: "25-34", orden: 3 },
            "35-44": { rango: "35-44", orden: 4 },
            "45-54": { rango: "45-54", orden: 5 },
            "55-64": { rango: "55-64", orden: 6 }, 
            "65+": { rango: "65+", orden: 7 },
        };

        // Inicializamos los contadores de todas las enfermedades a 0 en cada rango de edad
        // Esto evita errores de "undefined" al sumar luego
        Object.values(agrupacionEdades).forEach(cajon => {
            enfermedadesUnicas.forEach(enf => {
                cajon[enf] = 0;
            });
        });

        // c) Clasificamos cada paciente sumando a su enfermedad correspondiente
        datosCrudos.forEach(caso => {
            // 1. Clasificamos por edad
            let claveRango = "65+";
            if (caso.edad <= 14) claveRango = "0-14";
            else if (caso.edad <= 24) claveRango = "15-24";
            else if (caso.edad <= 34) claveRango = "25-34";
            else if (caso.edad <= 44) claveRango = "35-44";
            else if (caso.edad <= 54) claveRango = "45-54";
            else if (caso.edad <= 64) claveRango = "55-64";

            // 2. Extraemos la enfermedad
            const enfermedad = caso.enfermedad ? caso.enfermedad.trim() : 'Desconocida';

            // 3. Sumamos 1 al contador de ESA enfermedad en ESE rango de edad
            agrupacionEdades[claveRango][enfermedad] += 1;
        });

        const datosParaGrafica = Object.values(agrupacionEdades).sort((a: any, b: any) => a.orden - b.orden);

        // d) Creamos la configuración de "series" (las barras) de forma dinámica
        // Creará un objeto por cada enfermedad distinta
        const seriesDinamicas = enfermedadesUnicas.map((enf) => ({
            type: "bar" as const, // el 'as const' es para que TypeScript no se queje
            xKey: "rango",
            yKey: enf,
            yName: enf,
            stacked: true,
            strokeWidth: 0
        }));

        // e) Actualizamos el gráfico
        setOptions((opcionesPrevias) => ({
            ...opcionesPrevias,
            data: datosParaGrafica,
            series: seriesDinamicas
        }));

    }, [datosCrudos]);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
            <div style={{ height: '400px' }}>
                <AgCharts options={options} />
            </div>
        </div>
    );
};

export default ChartBarrasEdadCasos;