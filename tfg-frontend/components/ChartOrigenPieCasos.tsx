import { useState, useEffect, useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

const ChartOrigenPieCasos  = ({ data }: { data: any[] }) => {
    const [enfermedadSeleccionada, setEnfermedadSeleccionada] = useState<string>('Todas');

    const enfermedades = useMemo(() => {
        if (!data) return [];
        const listaEnfermedades = data.map((caso: any) => caso.enfermedad ? caso.enfermedad.trim() : 'Desconocida');
        return Array.from(new Set(listaEnfermedades)) as string[];
    }, [data]);


    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Origen de los casos registrados",
        },
        subtitle: {
            text: "Autóctonos (España) vs Importados",
        },
        data: [],
        series: [
            {
                type: "pie",
                angleKey: "numero",
                legendItemKey: "origen",
            },
        ],
    });

    
    useEffect(() => {
        if (data.length === 0) return;

        const datosFiltrados = enfermedadSeleccionada === 'Todas'
            ? data
            : data.filter(caso => 
                (caso.enfermedad ? caso.enfermedad.trim() : 'Desconocida') === enfermedadSeleccionada);

        const conteoOrigen = datosFiltrados.reduce((acumulador: any, caso: any) => {
            // Limpiamos espacios y verificamos si es España
            const paisLimpio = caso.pais ? caso.pais.trim() : "";
            let categoria: string;
            
            if (paisLimpio === "España") {
                categoria = "Autóctono";
            } else if (!paisLimpio || paisLimpio.toLowerCase() === "desconocido") {
                categoria = "Desconocido";
            } else {
                categoria = "Importado";
            }

            // Sumamos al contador de esa categoría
            acumulador[categoria] = (acumulador[categoria] || 0) + 1;

            return acumulador;
        }, {});


        const datosParaGrafica = Object.keys(conteoOrigen).map(clave => ({
            origen: clave,
            numero: conteoOrigen[clave]
        }));

        setOptions((opcionesPrevias) => ({
            ...opcionesPrevias,
            data: datosParaGrafica
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

export default ChartOrigenPieCasos;
