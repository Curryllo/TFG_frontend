import { useState, useEffect } from 'react';
import { AgCharts } from 'ag-charts-react';
import { AgChartOptions } from 'ag-charts-community';

const ChartVectoresAnillo = ({ data }: { data: any[] }) => {
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
        if (!data || data.length === 0) {
            setOptions((prev) => ({ ...prev, data: [] }));
            return;
        }

        const agrupacion = data.reduce((acc: any, item: any) => {
            let generoRaw = item.genero ? String(item.genero).trim() : 'Desconocido';
            
            let etiquetaGenero = 'Desconocido';
            if (generoRaw === 'H') etiquetaGenero = 'Hembras';
            if (generoRaw === 'M') etiquetaGenero = 'Machos';

            if (!acc[etiquetaGenero]) {
                acc[etiquetaGenero] = { genero: etiquetaGenero, numero: 0 };
            }

            acc[etiquetaGenero].numero += (Number(item.numero) || 0);

            return acc;
        }, {});

        const datosFinales = Object.values(agrupacion);

        setOptions((opcionesPrevias) => ({
            ...opcionesPrevias,
            data: datosFinales
        }));
        
    }, [data]);

    return (
        <div className="bg-white p-6 rounded-xl shadow border border-gray-200 mx-4 my-2">
            <AgCharts options={options} />
        </div>
    );
};

export default ChartVectoresAnillo;