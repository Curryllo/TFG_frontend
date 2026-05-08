import { useMemo } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

const ChartDonutEspeciesGarrapatas = ({ data }: { data: any[] }) => {
    
    const chartOptions = useMemo<AgChartOptions | null>(() => {
        // 1. Si no hay datos, devolvemos null en lugar de unas opciones vacías
        if (!data || data.length === 0) {
            return null;
        }

        const agrupados = data.reduce((acc: any, caso: any) => {
            const especie = caso.especie ? String(caso.especie).trim() : 'Desconocida';
            if (!acc[especie]) acc[especie] = { especie, cantidad: 0 };
            acc[especie].cantidad += 1;
            return acc;
        }, {});

        const datosProcesados = Object.values(agrupados);

        return {
            title: { text: "Especies de garrapatas recogidas" },
            data: datosProcesados,
            series: [
                {
                    type: "donut",
                    angleKey: "cantidad",
                    legendItemKey: "especie",
                    innerRadiusRatio: 0.6,
                    calloutLabelKey: "especie",
                    sectorLabelKey: "cantidad",
                    sectorLabel: {
                        color: "white",
                        fontWeight: "bold",
                    }
                }
            ]
        } as unknown as AgChartOptions;
    }, [data]);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
            {!chartOptions ? (
                <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Especies de garrapatas recogidas</h3>
                    <p>No hay datos registrados para este año.</p>
                </div>
            ) : (
                <AgCharts key={JSON.stringify(chartOptions.data)} options={chartOptions} />
            )}
        </div>
    );
};

export default ChartDonutEspeciesGarrapatas;