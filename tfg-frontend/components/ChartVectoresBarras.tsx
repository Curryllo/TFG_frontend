import { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

const ChartVectoresBarras = ({ data }: { data: any[] }) => {
    const [options, setOptions] = useState<AgChartOptions>({
        title: {
            text: "Muestras obtenidas por vectores",
        },
        subtitle: {
            text: " ",
        },
        data: [],
        series: [
            {
                type: "bar",
                xKey: "vector",
                yKey: "numero",
                yName: "Número de muestras",
            },
        ],
    });

    useEffect(() => {
        if (!data || data.length === 0) {
            setOptions((prev) => ({ ...prev, data: [] }));
            return;
        }

        const agrupado = data.reduce((acc: any, item: any) => {
            const vector = (item.vector || 'Desconocido').trim();
            
            if (!acc[vector]) acc[vector] = { vector, numero: 0 };
            
            acc[vector].numero += (Number(item.numero) || 0); 
            
            return acc;
        }, {});

        setOptions((prev) => ({
            ...prev,
            data: Object.values(agrupado),
        }));

    }, [data]);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
            <AgCharts key={options.data?.length} options={options} />
        </div>
    );
};

export default ChartVectoresBarras;