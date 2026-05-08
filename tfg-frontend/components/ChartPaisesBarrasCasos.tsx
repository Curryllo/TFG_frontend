import { useState, useEffect, useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

const ChartPaisesBarrasCasos = ({ data }: { data: any[] }) => {
    const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState<string>('Todas');

    const enfermedades = useMemo(() => {
        if (!data) return [];
        const listaEnfermedades = data.map((caso: any) => caso.enfermedad || 'Desconocida');
        return Array.from(new Set(listaEnfermedades)) as string[];
    }, [data]);

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
        if (data.length === 0) return;

        const datosFiltrados = enfermedadSeleccionada === 'Todas'
            ? data
            : data.filter(caso => (caso.enfermedad || 'Desconocida') === enfermedadSeleccionada);

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

    }, [data, enfermedadSeleccionada]);

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
