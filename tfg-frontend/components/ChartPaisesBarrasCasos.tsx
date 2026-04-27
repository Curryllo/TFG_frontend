import React, { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';
import { getDatosHumanos } from "@/app/visualizar/actions";

const ChartPaisesBarrasCasos = () => {

    const [datosCrudos, setDatosCrudos] = useState<any[]>([]);
    const [enfermedades, setEnfermedades] = useState<string[]>([]);
    const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState<string>('Todas');

    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Casos registrados por pais",
        },
        subtitle: {
            text: " ",
        },
        data: [],
        series: [
            {
                type: "bar",
                xKey: "pais",
                yKey: "numero",
                yName: "Número de casos",
            },
        ],
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const respuesta = await getDatosHumanos();
                if (respuesta.success && respuesta.data) {
                    setDatosCrudos(respuesta.data);

                    const listaEnfermedades = respuesta.data.map((caso: any) => caso.enfermedad || 'Desconocida');
                    const enfermedadesUnicas = Array.from(new Set(listaEnfermedades)) as string[];
                    setEnfermedades(enfermedadesUnicas);

                    console.log("Enfermedades cargadas de forma única:", enfermedadesUnicas);

                } else {
                    console.warn("No se pudieron cargar los datos de monitoreo o la respuesta no fue exitosa.", respuesta);
                }
            } catch (error) {
                console.error("Error al cargar los datos de monitoreo:", error);
            }
        };

        cargarDatos();
    }, []);

    useEffect(() => {
        if (datosCrudos.length === 0) return;

        const datosFiltrados = enfermedadSeleccionada === 'Todas'
            ? datosCrudos
            : datosCrudos.filter(caso => (caso.enfermedad || 'Desconocida') === enfermedadSeleccionada);

        const conteoPorPais = datosFiltrados.reduce((acumulador: any, caso: any) => {
            const pais = caso.pais || 'Desconocido';
            acumulador[pais] = (acumulador[pais] || 0) + 1;
            return acumulador;
        }, {});

        const datosParaGrafica = Object.keys(conteoPorPais).map(clave => ({
            pais: clave,
            numero: conteoPorPais[clave]
        }));

        setOptions((opcionesPrevias) => ({
            ...opcionesPrevias,
            data: datosParaGrafica,
            title: {
                text: enfermedadSeleccionada === 'Todas'
                    ? "Casos totales registrados por país"
                    : `Casos de ${enfermedadSeleccionada.trim()} por país`
            }
        }));

    }, [datosCrudos, enfermedadSeleccionada]);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
            <div className="px-4 pt-4 flex items-center gap-3">
                <label htmlFor="selector-enfermedad" className="font-semibold text-gray-700">
                    Filtrar por enfermedad:
                </label>
                <select
                    id="selector-enfermedad"
                    value={enfermedadSeleccionada}
                    onChange={(e) => setEnfermedadSeleccionada(e.target.value)}
                    className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white text-gray-800"
                >
                    <option value="Todas">Todas las enfermedades</option>
                    {enfermedades.map((enf) => (
                        <option key={enf} value={enf}>
                            {enf}
                        </option>
                    ))}
                </select>
            </div>
            <AgCharts options={options} />
        </div>
    );
};

export default ChartPaisesBarrasCasos;
