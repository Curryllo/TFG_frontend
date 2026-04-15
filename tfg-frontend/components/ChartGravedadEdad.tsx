'use client'

import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { getDatosHumanos } from "@/app/visualizar/graficos/action"; // Ajusta la ruta si es distinta

const ChartGravedadEdad = () => {
    // 1. Estados para los datos y el selector
    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);
    const [enfermedades, setEnfermedades] = useState<string[]>([]);
    const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState<string>('Todas');

    // 2. Estado de configuración del gráfico
    const [options, setOptions] = useState<AgChartOptions>({
        title: { text: "Gravedad clínica por grupos de edad" },
        subtitle: { text: " " },
        data: [],
        series: [
            { type: "bar", xKey: "rango", yKey: "Ambulatorio", yName: "Ambulatorio (Leve)", stacked: true, fill: "#f5c62c", strokeWidth: 0 },
            { type: "bar", xKey: "rango", yKey: "Hospitalizado", yName: "Hospitalizado (Grave)", stacked: true, fill: "#ffa202", strokeWidth: 0 },
            { type: "bar", xKey: "rango", yKey: "Defuncion", yName: "Defunción", stacked: true, fill: "#ef6644", strokeWidth: 0 }
        ],
        axes: [
            { type: "category", position: "bottom", title: { text: "Rango de Edad" } },
            { type: "number", position: "left", title: { text: "Número de Casos" } }
        ]
    });

    // 3. Primer efecto: Obtener los datos de la base de datos (se ejecuta solo una vez)
    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosHumanos();

                if (respuesta.success && respuesta.data) {
                    setDatosCrudos(respuesta.data);

                    // Sacamos la lista de enfermedades para el desplegable
                    const listaEnfermedades = respuesta.data.map((caso: any) => 
                        caso.enfermedad ? caso.enfermedad.trim() : 'Desconocida'
                    );
                    const enfermedadesUnicas = Array.from(new Set(listaEnfermedades)) as string[];
                    setEnfermedades(enfermedadesUnicas);
                }
            } catch (error) {
                console.error("Error al cargar los datos:", error);
            }
        };

        cargarDatos();
    }, []);

    // 4. Segundo efecto: Filtrar y agrupar cuando cambian los datos o el selector
    useEffect(() => {
        if (datosCrudos.length === 0) return;

        // a) Filtramos por la enfermedad que haya elegido el usuario en este gráfico
        const datosFiltrados = enfermedadSeleccionada === 'Todas'
            ? datosCrudos
            : datosCrudos.filter(caso => (caso.enfermedad ? caso.enfermedad.trim() : 'Desconocida') === enfermedadSeleccionada);

        // b) Preparamos los "cajones" para las edades
        const agrupacionEdades = {
            "0-18": { rango: "0-18", Ambulatorio: 0, Hospitalizado: 0, Defuncion: 0, orden: 1 },
            "19-30": { rango: "19-30", Ambulatorio: 0, Hospitalizado: 0, Defuncion: 0, orden: 2 },
            "31-45": { rango: "31-45", Ambulatorio: 0, Hospitalizado: 0, Defuncion: 0, orden: 3 },
            "46-60": { rango: "46-60", Ambulatorio: 0, Hospitalizado: 0, Defuncion: 0, orden: 4 },
            "60+": { rango: "60+", Ambulatorio: 0, Hospitalizado: 0, Defuncion: 0, orden: 5 },
        };

        // c) Clasificamos cada paciente en su cajón
        datosFiltrados.forEach(caso => {
            // 1. Clasificamos por edad
            let claveRango = "60+";
            if (caso.edad <= 18) claveRango = "0-18";
            else if (caso.edad <= 30) claveRango = "19-30";
            else if (caso.edad <= 45) claveRango = "31-45";
            else if (caso.edad <= 60) claveRango = "46-60";

            // 2. Leemos la defunción (Buscamos 'Y', 'S' de Sí, o 'TRUE' por si acaso)
            const valorDefuncion = String(caso.defuncion).trim().toUpperCase();
            const esDefuncion = valorDefuncion === 'Y' || valorDefuncion === 'S' || valorDefuncion === 'TRUE';

            // 3. Leemos la hospitalización (Leemos de caso.casohospitalizado o caso.hospitalizado)
            const valorHospitalizado = String(caso.casohospitalizado || caso.hospitalizado).trim().toUpperCase();
            const esHospitalizado = valorHospitalizado === 'Y' || valorHospitalizado === 'S' || valorHospitalizado === 'TRUE';

            // 4. Repartimos en los cajones
            if (esDefuncion) {
                agrupacionEdades[claveRango as keyof typeof agrupacionEdades].Defuncion += 1;
            } else if (esHospitalizado) {
                agrupacionEdades[claveRango as keyof typeof agrupacionEdades].Hospitalizado += 1;
            } else {
                agrupacionEdades[claveRango as keyof typeof agrupacionEdades].Ambulatorio += 1;
            }
        });
        const datosParaGrafica = Object.values(agrupacionEdades).sort((a, b) => a.orden - b.orden);

        // d) Actualizamos el gráfico
        setOptions((opcionesPrevias) => ({
            ...opcionesPrevias,
            data: datosParaGrafica,
            title: {
                text: enfermedadSeleccionada === 'Todas' 
                    ? "Gravedad clínica general por grupos de edad" 
                    : `Gravedad clínica de ${enfermedadSeleccionada} por edad`
            }
        }));

    }, [datosCrudos, enfermedadSeleccionada]);

    return (
        <div className="flex flex-col gap-4 w-full mb-6">
            {/* Selector de enfermedad específico para este gráfico */}
            <div className="flex items-center gap-3">
                <label className="font-semibold text-gray-700">
                    Filtrar gravedad por:
                </label>
                <select 
                    value={enfermedadSeleccionada} 
                    onChange={(e) => setEnfermedadSeleccionada(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg outline-none bg-white text-gray-800"
                >
                    <option value="Todas">Todas las enfermedades</option>
                    {enfermedades.map((enf) => (
                        <option key={enf} value={enf}>{enf}</option>
                    ))}
                </select>
            </div>

            {/* El Gráfico */}
            <div style={{ height: '400px' }}>
                <AgCharts options={options} />
            </div>
        </div>
    );
};

export default ChartGravedadEdad;