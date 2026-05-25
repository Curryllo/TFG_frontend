import { useState, useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

const ChartBarrasGarrapatas = ({ data }: { data: any[] }) => {
    const [modoPorcentaje, setModoPorcentaje] = useState(false);

    const chartOptions = useMemo<AgChartOptions>(() => {
        if (!data || data.length === 0) {
            return {
                title: { text: "Especies de garrapatas recogidas" },
                data: [],
                axes: [
                    { type: "category", position: "bottom", title: { text: "Especie" } },
                    { type: "number", position: "left" }
                ],
                series: []
            } as unknown as AgChartOptions;
        }

        const agrupados = data.reduce((acc, caso) => {
            const especie = caso.especie ? caso.especie.trim() : 'Desconocida';
            if (!acc[especie]) {
                acc[especie] = { especie: especie, humano: 0, animal: 0 };
            }
            
            const enHumano = caso.enHumano ? String(caso.enHumano).trim() : '';
            const enAnimal = caso.animal ? String(caso.animal).trim() : '';

            if (enHumano === 'Y') acc[especie].humano += 1;
            if (enAnimal !== '') acc[especie].animal += 1;
            
            return acc;
        }, {} as Record<string, { especie: string, humano: number, animal: number }>);

        const datosFinales = Object.values(agrupados) as { especie: string, humano: number, animal: number }[];
        datosFinales.sort((a, b) => (b.humano + b.animal) - (a.humano + a.animal));

        return {
            title: { text: "Especies de garrapatas recogidas" },
            data: datosFinales,
            axes: [
                { type: "category", position: "bottom", title: { text: "Especie" } },
                { 
                    type: "number", 
                    position: "left", 
                    title: { text: modoPorcentaje ? "Porcentaje (%)" : "Cantidad Absoluta" },
                    label: { formatter: (params: any) => modoPorcentaje ? `${params.value}%` : String(params.value) }
                }
            ],
            series: [
                {
                    type: "bar",
                    xKey: "especie",
                    yKey: "humano",
                    yName: "En Humanos",
                    stacked: true,
                    normalizedTo: modoPorcentaje ? 100 : undefined,
                    fill: "#ef4444", 
                    strokeWidth: 0
                },
                {
                    type: "bar",
                    xKey: "especie",
                    yKey: "animal",
                    yName: "En Animales",
                    stacked: true,
                    normalizedTo: modoPorcentaje ? 100 : undefined,
                    fill: "#3b82f6", 
                    strokeWidth: 0
                }
            ]
        } as unknown as AgChartOptions;
    }, [data, modoPorcentaje]);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
            <button 
                onClick={() => setModoPorcentaje(!modoPorcentaje)}
                className='mb-4 p-2 border border-gray-300 rounded-lg outline-none bg-white text-gray-800 hover:bg-gray-50 transition-colors'
            >
                Cambiar a {modoPorcentaje ? 'Valores Absolutos' : 'Porcentajes (%)'}
            </button>
            
            <div>
                <AgCharts key={JSON.stringify(chartOptions.data)} options={chartOptions} />
            </div>
        </div>
    );
};

export default ChartBarrasGarrapatas;