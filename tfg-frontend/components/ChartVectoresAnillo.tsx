'use client';

import { useState, useEffect } from 'react';
import { getDatosMontireo } from "@/app/(main)/visualizar/actions";
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

const ChartVectoresAnillo = () => {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Proporción por Género",
        },
        data: [],
        series: [
            {
                type: "donut",
                calloutLabelKey: "genero",
                angleKey: "numero"
            },
        ],
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosMontireo();

                if (respuesta.success && respuesta.data) {
                    
                    // --- 1. LÓGICA DE AGRUPACIÓN ---
                    // Usamos reduce para sumar los números por cada género
                    const agrupacion = respuesta.data.reduce((acc: any, item: any) => {
                        // Limpiamos el dato del género (por si hay espacios u otros caracteres)
                        let generoRaw = item.genero ? String(item.genero).trim() : 'Desconocido';
                        
                        // Traducimos las siglas para que el gráfico quede más profesional
                        let etiquetaGenero = 'Desconocido';
                        if (generoRaw === 'H') etiquetaGenero = 'Hembras';
                        if (generoRaw === 'M') etiquetaGenero = 'Machos';

                        // Si es la primera vez que vemos este género, lo inicializamos a 0
                        if (!acc[etiquetaGenero]) {
                            acc[etiquetaGenero] = { genero: etiquetaGenero, numero: 0 };
                        }

                        // Sumamos la cantidad de vectores de este registro
                        acc[etiquetaGenero].numero += (Number(item.numero) || 0);

                        return acc;
                    }, {});

                    // Convertimos el diccionario agrupado de vuelta a un array para el gráfico
                    const datosFinales = Object.values(agrupacion);

                    

                    // --- 2. ACTUALIZAMOS EL GRÁFICO ---
                    setOptions((opcionesPrevias) => ({
                        ...opcionesPrevias,
                        data: datosFinales
                    }));
                    
                } else {
                    console.warn("No se pudieron cargar los datos", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        cargarDatos();
    }, []);

    return <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2"><AgCharts options={options} /></div>;
};

export default ChartVectoresAnillo;